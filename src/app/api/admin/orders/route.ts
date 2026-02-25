import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceSupabase();

  const { data, error } = await supabase
    .from("orders")
    .select("id, amount, status, created_at, customers(email), products(name)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const orders = (data || []).map((order) => ({
    id: order.id,
    customer_email:
      (order.customers as unknown as { email: string })?.email || "Unknown",
    product_name:
      (order.products as unknown as { name: string })?.name || "Product",
    amount: order.amount,
    status: order.status,
    created_at: order.created_at,
  }));

  return NextResponse.json({ orders });
}
