import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import crypto from "crypto";

export async function POST(request: NextRequest) {
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
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    // Invalidate any existing unused tokens for this customer
    await supabase
      .from("discord_link_tokens")
      .update({ used: true })
      .eq("customer_id", customer.id)
      .eq("used", false);

    // Generate a new 8-character uppercase token
    const linkToken = crypto.randomBytes(5).toString("hex").toUpperCase().slice(0, 8);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    const { error: insertError } = await supabase
      .from("discord_link_tokens")
      .insert({
        token: linkToken,
        customer_id: customer.id,
        expires_at: expiresAt.toISOString(),
        used: false,
      });

    if (insertError) {
      return NextResponse.json({ error: "Failed to generate token" }, { status: 500 });
    }

    return NextResponse.json({
      token: linkToken,
      expires_at: expiresAt.toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
