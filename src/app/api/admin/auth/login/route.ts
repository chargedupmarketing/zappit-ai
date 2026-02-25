import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import {
  verifyPassword,
  createAdminToken,
  setAdminCookie,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = getServiceSupabase();

    const { data: admin } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .single();

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, admin.password_hash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = createAdminToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    });

    await setAdminCookie(token);

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
