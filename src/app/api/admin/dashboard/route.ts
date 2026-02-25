import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceSupabase();

  // Total revenue
  const { data: revenueData } = await supabase
    .from("orders")
    .select("amount")
    .eq("status", "completed");

  const totalRevenue = (revenueData || []).reduce(
    (sum, order) => sum + Number(order.amount),
    0
  );

  // Total customers
  const { count: totalCustomers } = await supabase
    .from("customers")
    .select("*", { count: "exact", head: true });

  // Active subscriptions
  const { count: activeSubscriptions } = await supabase
    .from("subscriptions")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  // Total orders
  const { count: totalOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  // Recent orders
  const { data: recentOrders } = await supabase
    .from("orders")
    .select("id, amount, status, created_at, customers(email), products(name)")
    .order("created_at", { ascending: false })
    .limit(10);

  return NextResponse.json({
    totalRevenue,
    totalCustomers: totalCustomers || 0,
    activeSubscriptions: activeSubscriptions || 0,
    totalOrders: totalOrders || 0,
    recentOrders: (recentOrders || []).map((order) => ({
      id: order.id,
      customer_email:
        (order.customers as unknown as { email: string })?.email || "Unknown",
      product_name:
        (order.products as unknown as { name: string })?.name || "Product",
      amount: order.amount,
      status: order.status,
      created_at: order.created_at,
    })),
  });
}
