import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getServiceSupabase } from "@/lib/supabase";
import type { CartItem } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const { items, customerEmail, discountCode } = (await request.json()) as {
      items: CartItem[];
      customerEmail: string;
      discountCode?: string;
    };

    if (!items?.length || !customerEmail) {
      return NextResponse.json(
        { error: "Items and customer email are required" },
        { status: 400 }
      );
    }

    const supabase = getServiceSupabase();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Get or create Stripe customer
    let stripeCustomerId: string | undefined;
    const { data: customer } = await supabase
      .from("customers")
      .select("stripe_customer_id")
      .eq("email", customerEmail)
      .single();

    if (customer?.stripe_customer_id) {
      stripeCustomerId = customer.stripe_customer_id;
    } else {
      const stripeCustomer = await stripe.customers.create({
        email: customerEmail,
      });
      stripeCustomerId = stripeCustomer.id;

      await supabase
        .from("customers")
        .update({ stripe_customer_id: stripeCustomerId })
        .eq("email", customerEmail);
    }

    // Validate discount code if provided
    let couponId: string | undefined;
    if (discountCode) {
      const { data: discount } = await supabase
        .from("discount_codes")
        .select("*")
        .eq("code", discountCode.toUpperCase())
        .eq("active", true)
        .single();

      if (discount) {
        const now = new Date();
        const notExpired = !discount.expires_at || new Date(discount.expires_at) > now;
        const notMaxed = !discount.max_uses || discount.used_count < discount.max_uses;

        if (notExpired && notMaxed) {
          // Create Stripe coupon
          const stripeCoupon = await stripe.coupons.create({
            ...(discount.type === "percentage"
              ? { percent_off: discount.value }
              : { amount_off: Math.round(discount.value * 100), currency: "usd" }),
            duration: "once",
          });
          couponId = stripeCoupon.id;

          // Increment usage
          await supabase
            .from("discount_codes")
            .update({ used_count: discount.used_count + 1 })
            .eq("id", discount.id);
        }
      }
    }

    const hasSubscriptions = items.some(
      (item) => item.price.billing_type !== "lifetime"
    );

    // Build line items
    const lineItems: Array<{
      price?: string;
      price_data?: {
        currency: string;
        product_data: { name: string; description?: string };
        unit_amount: number;
        recurring?: { interval: "month" | "year" };
      };
      quantity: number;
    }> = [];

    for (const item of items) {
      if (item.price.stripe_price_id) {
        lineItems.push({
          price: item.price.stripe_price_id,
          quantity: item.quantity,
        });
      } else {
        const isRecurring = item.price.billing_type !== "lifetime";
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.product.name,
              description: item.product.short_description,
            },
            unit_amount: Math.round(item.price.price * 100),
            ...(isRecurring
              ? {
                  recurring: {
                    interval:
                      item.price.billing_type === "monthly" ? "month" : "year",
                  },
                }
              : {}),
          },
          quantity: item.quantity,
        });
      }
    }

    // Determine checkout mode
    const mode: "subscription" | "payment" = hasSubscriptions
      ? "subscription"
      : "payment";

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      customer: stripeCustomerId,
      mode,
      line_items: lineItems as Stripe.Checkout.SessionCreateParams.LineItem[],
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cart`,
      metadata: {
        product_ids: items.map((i) => i.product.id).join(","),
        price_ids: items.map((i) => i.price.id).join(","),
      },
    };

    if (couponId) {
      sessionConfig.discounts = [{ coupon: couponId }];
    } else {
      sessionConfig.allow_promotion_codes = true;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
