import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceSupabase();

  const { data, error } = await supabase
    .from("products")
    .select("*, product_prices(*)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const products = (data || []).map((p) => ({
    ...p,
    prices: p.product_prices,
    product_prices: undefined,
  }));

  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const supabase = getServiceSupabase();

  const { data: product, error } = await supabase
    .from("products")
    .insert({
      name: body.name,
      slug: body.slug,
      description: body.description || "",
      short_description: body.short_description || "",
      type: body.type,
      platform: body.platform,
      audience: body.audience,
      status: body.status,
      featured: body.featured || false,
      features: [],
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Create prices
  const prices = [];
  if (body.monthly_price) {
    prices.push({
      product_id: product.id,
      billing_type: "monthly",
      price: parseFloat(body.monthly_price),
    });
  }
  if (body.yearly_price) {
    prices.push({
      product_id: product.id,
      billing_type: "yearly",
      price: parseFloat(body.yearly_price),
    });
  }
  if (body.lifetime_price) {
    prices.push({
      product_id: product.id,
      billing_type: "lifetime",
      price: parseFloat(body.lifetime_price),
    });
  }

  if (prices.length > 0) {
    await supabase.from("product_prices").insert(prices);
  }

  return NextResponse.json({ product });
}
