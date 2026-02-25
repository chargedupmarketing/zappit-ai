import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getServiceSupabase } from "@/lib/supabase";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = getServiceSupabase();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(supabase, session);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(supabase, subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(supabase, subscription);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(supabase, invoice);
        break;
      }
    }
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(
  supabase: ReturnType<typeof getServiceSupabase>,
  session: Stripe.Checkout.Session
) {
  const customerId = session.customer as string;
  const productIds = session.metadata?.product_ids?.split(",") || [];
  const priceIds = session.metadata?.price_ids?.split(",") || [];

  // Find the customer
  const { data: customer } = await supabase
    .from("customers")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();

  if (!customer) return;

  for (let i = 0; i < productIds.length; i++) {
    const productId = productIds[i];
    const priceId = priceIds[i];

    // Create order record
    await supabase.from("orders").insert({
      customer_id: customer.id,
      product_id: productId,
      price_id: priceId,
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent as string,
      amount: (session.amount_total || 0) / 100,
      status: "completed",
    });

    // If subscription mode, create subscription record
    if (session.mode === "subscription" && session.subscription) {
      const stripeSubscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      await supabase.from("subscriptions").insert({
        customer_id: customer.id,
        product_id: productId,
        price_id: priceId,
        stripe_subscription_id: stripeSubscription.id,
        status: "active",
        current_period_start: new Date(
          stripeSubscription.current_period_start * 1000
        ).toISOString(),
        current_period_end: new Date(
          stripeSubscription.current_period_end * 1000
        ).toISOString(),
      });
    }
  }
}

async function handleSubscriptionUpdated(
  supabase: ReturnType<typeof getServiceSupabase>,
  subscription: Stripe.Subscription
) {
  const statusMap: Record<string, string> = {
    active: "active",
    past_due: "past_due",
    canceled: "cancelled",
    incomplete: "incomplete",
    trialing: "trialing",
  };

  await supabase
    .from("subscriptions")
    .update({
      status: statusMap[subscription.status] || subscription.status,
      current_period_start: new Date(
        subscription.current_period_start * 1000
      ).toISOString(),
      current_period_end: new Date(
        subscription.current_period_end * 1000
      ).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
    })
    .eq("stripe_subscription_id", subscription.id);
}

async function handleSubscriptionDeleted(
  supabase: ReturnType<typeof getServiceSupabase>,
  subscription: Stripe.Subscription
) {
  await supabase
    .from("subscriptions")
    .update({ status: "cancelled" })
    .eq("stripe_subscription_id", subscription.id);
}

async function handlePaymentFailed(
  supabase: ReturnType<typeof getServiceSupabase>,
  invoice: Stripe.Invoice
) {
  if (invoice.subscription) {
    await supabase
      .from("subscriptions")
      .update({ status: "past_due" })
      .eq("stripe_subscription_id", invoice.subscription as string);
  }
}
