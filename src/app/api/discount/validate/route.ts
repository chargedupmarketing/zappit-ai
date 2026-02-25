import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { code, subtotal } = await request.json();

    if (!code) {
      return NextResponse.json(
        { valid: false, message: "No discount code provided" },
        { status: 400 }
      );
    }

    const supabase = getServiceSupabase();

    const { data: discount } = await supabase
      .from("discount_codes")
      .select("*")
      .eq("code", code.toUpperCase())
      .eq("active", true)
      .single();

    if (!discount) {
      return NextResponse.json({
        valid: false,
        message: "Invalid discount code",
      });
    }

    // Check expiry
    if (discount.expires_at && new Date(discount.expires_at) < new Date()) {
      return NextResponse.json({
        valid: false,
        message: "This code has expired",
      });
    }

    // Check max uses
    if (discount.max_uses && discount.used_count >= discount.max_uses) {
      return NextResponse.json({
        valid: false,
        message: "This code has reached its usage limit",
      });
    }

    // Calculate discount
    let discountValue = 0;
    if (discount.type === "percentage") {
      discountValue = (subtotal * discount.value) / 100;
    } else {
      discountValue = Math.min(discount.value, subtotal);
    }

    return NextResponse.json({
      valid: true,
      discount: discountValue,
      message: `${discount.type === "percentage" ? `${discount.value}%` : `$${discount.value}`} discount applied!`,
    });
  } catch {
    return NextResponse.json(
      { valid: false, message: "Failed to validate code" },
      { status: 500 }
    );
  }
}
