import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = getServiceSupabase();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: customer } = await supabase
      .from("customers")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();

    if (!customer) {
      return NextResponse.json({ products: [] });
    }

    // Get products from completed orders
    const { data: orders } = await supabase
      .from("orders")
      .select("product_id, created_at, product_prices(billing_type), products(name, type, platform)")
      .eq("customer_id", customer.id)
      .eq("status", "completed");

    // Get products from active subscriptions
    const { data: subs } = await supabase
      .from("subscriptions")
      .select("product_id, created_at, products(name, type, platform)")
      .eq("customer_id", customer.id)
      .eq("status", "active");

    const productMap = new Map<string, {
      id: string;
      name: string;
      type: string;
      platform: string;
      billing_type: string;
      purchased_at: string;
    }>();

    for (const order of orders || []) {
      const product = order.products as unknown as { name: string; type: string; platform: string };
      const price = order.product_prices as unknown as { billing_type: string };
      if (product) {
        productMap.set(order.product_id, {
          id: order.product_id,
          name: product.name,
          type: product.type,
          platform: product.platform,
          billing_type: price?.billing_type || "lifetime",
          purchased_at: order.created_at,
        });
      }
    }

    for (const sub of subs || []) {
      const product = sub.products as unknown as { name: string; type: string; platform: string };
      if (product && !productMap.has(sub.product_id)) {
        productMap.set(sub.product_id, {
          id: sub.product_id,
          name: product.name,
          type: product.type,
          platform: product.platform,
          billing_type: "subscription",
          purchased_at: sub.created_at,
        });
      }
    }

    return NextResponse.json({
      products: Array.from(productMap.values()),
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
