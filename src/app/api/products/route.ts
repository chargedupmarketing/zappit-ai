import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const featured = searchParams.get("featured");

    const supabase = getServiceSupabase();

    let query = supabase
      .from("products")
      .select("*, product_prices(*)")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (type) {
      query = query.eq("type", type);
    }

    if (featured === "true") {
      query = query.eq("featured", true);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const products = (data || []).map((product) => ({
      ...product,
      prices: product.product_prices,
      product_prices: undefined,
    }));

    return NextResponse.json({ products });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
