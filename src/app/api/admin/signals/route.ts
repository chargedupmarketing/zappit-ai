import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { verifyAdminToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const tokenCookie = request.cookies.get("admin-token")?.value;
  if (!tokenCookie || !verifyAdminToken(tokenCookie)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("signals")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const tokenCookie = request.cookies.get("admin-token")?.value;
  if (!tokenCookie || !verifyAdminToken(tokenCookie)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { product_type, signal_type, instrument, price, timeframe, confidence, message, chart_symbol } = body;

    if (!product_type || !signal_type || !instrument) {
      return NextResponse.json(
        { error: "product_type, signal_type, and instrument are required" },
        { status: 400 }
      );
    }

    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from("signals")
      .insert({
        product_type,
        signal_type,
        instrument,
        price: price ? parseFloat(price) : null,
        timeframe: timeframe || null,
        confidence: confidence ? parseInt(confidence) : null,
        message: message || null,
        chart_symbol: chart_symbol || null,
        delivered: false,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
