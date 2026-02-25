import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceSupabase();

  const { data: customers, error } = await supabase
    .from("customers")
    .select("id, email, name, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const users = await Promise.all(
    (customers || []).map(async (customer) => {
      const { count: activeSubscriptions } = await supabase
        .from("subscriptions")
        .select("*", { count: "exact", head: true })
        .eq("customer_id", customer.id)
        .eq("status", "active");

      const { count: totalOrders } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("customer_id", customer.id);

      return {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        active_subscriptions: activeSubscriptions || 0,
        total_orders: totalOrders || 0,
        created_at: customer.created_at,
      };
    })
  );

  return NextResponse.json({ users });
}
