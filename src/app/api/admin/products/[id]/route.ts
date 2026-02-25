import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const supabase = getServiceSupabase();

  const { error } = await supabase
    .from("products")
    .update({
      name: body.name,
      slug: body.slug,
      description: body.description || "",
      short_description: body.short_description || "",
      type: body.type,
      platform: body.platform,
      audience: body.audience,
      status: body.status,
      featured: body.featured || false,
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Upsert prices
  const priceTypes = [
    { key: "monthly_price", billing_type: "monthly" },
    { key: "yearly_price", billing_type: "yearly" },
    { key: "lifetime_price", billing_type: "lifetime" },
  ];

  for (const pt of priceTypes) {
    const value = body[pt.key];
    if (value) {
      const { data: existing } = await supabase
        .from("product_prices")
        .select("id")
        .eq("product_id", id)
        .eq("billing_type", pt.billing_type)
        .single();

      if (existing) {
        await supabase
          .from("product_prices")
          .update({ price: parseFloat(value) })
          .eq("id", existing.id);
      } else {
        await supabase.from("product_prices").insert({
          product_id: id,
          billing_type: pt.billing_type,
          price: parseFloat(value),
        });
      }
    }
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = getServiceSupabase();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
