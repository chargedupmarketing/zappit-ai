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
      return NextResponse.json({ orders: [] });
    }

    const { data: orders } = await supabase
      .from("orders")
      .select("id, amount, status, created_at, products(name)")
      .eq("customer_id", customer.id)
      .order("created_at", { ascending: false });

    return NextResponse.json({
      orders: (orders || []).map((order) => ({
        id: order.id,
        product_name:
          (order.products as unknown as { name: string })?.name || "Product",
        amount: order.amount,
        status: order.status,
        created_at: order.created_at,
      })),
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
