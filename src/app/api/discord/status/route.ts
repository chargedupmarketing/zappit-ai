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
      return NextResponse.json({ linked: false });
    }

    const { data: link } = await supabase
      .from("discord_links")
      .select("discord_username, linked_at")
      .eq("customer_id", customer.id)
      .single();

    return NextResponse.json({
      linked: !!link,
      discord_username: link?.discord_username || null,
      linked_at: link?.linked_at || null,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
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
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await supabase
      .from("discord_links")
      .delete()
      .eq("customer_id", customer.id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
