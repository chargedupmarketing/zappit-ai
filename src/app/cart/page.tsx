"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  ArrowLeft,
  Tag,
  Zap,
  Loader2,
  X,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function CartPage() {
  const {
    items,
    removeItem,
    subtotal,
    discountCode,
    setDiscountCode,
    discountAmount,
    applyDiscount,
    total,
    checkout,
    loading,
  } = useCart();

  const [email, setEmail] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");
  const [discountValid, setDiscountValid] = useState<boolean | null>(null);

  async function handleApplyDiscount() {
    const result = await applyDiscount();
    setDiscountMessage(result.message);
    setDiscountValid(result.valid);
  }

  async function handleCheckout() {
    if (!email) return;
    await checkout(email);
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 grid-bg">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full glass flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-text-muted" />
          </div>
          <h1 className="text-2xl font-bold mb-3">Your Cart is Empty</h1>
          <p className="text-text-secondary mb-8">
            Browse our products to find the right trading tools for you.
          </p>
          <Link
            href="/#products"
            className="gradient-bg rounded-full px-8 py-3 font-semibold text-white btn-glow transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 grid-bg">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted text-sm hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <ShoppingCart className="w-8 h-8 text-neon-orange" />
          Your Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.price.id}`}
                className="glass rounded-xl p-6 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-lg">{item.product.name}</h3>
                  <p className="text-sm text-text-muted">
                    {item.price.billing_type === "lifetime"
                      ? "Lifetime Access"
                      : `${item.price.billing_type.charAt(0).toUpperCase() + item.price.billing_type.slice(1)} Subscription`}
                  </p>
                  <p className="text-sm text-text-secondary mt-1">
                    {item.product.platform === "both"
                      ? "TradingView & Apex"
                      : item.product.platform === "tradingview"
                        ? "TradingView"
                        : "Apex"}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xl font-bold">
                      ${item.price.price.toFixed(2)}
                    </div>
                    <div className="text-xs text-text-muted">
                      {item.price.billing_type === "monthly"
                        ? "/month"
                        : item.price.billing_type === "yearly"
                          ? "/year"
                          : "one-time"}
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id, item.price.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="glass rounded-xl p-6 h-fit sticky top-8">
            <h3 className="text-lg font-semibold mb-6">Order Summary</h3>

            {/* Discount code */}
            <div className="mb-6">
              <label className="block text-sm text-text-muted mb-2">
                Discount Code
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => {
                      setDiscountCode(e.target.value.toUpperCase());
                      setDiscountMessage("");
                      setDiscountValid(null);
                    }}
                    className="w-full bg-white/5 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-neon-orange/50 transition-colors"
                    placeholder="CODE"
                  />
                </div>
                <button
                  onClick={handleApplyDiscount}
                  className="px-4 py-2.5 bg-white/5 border border-border rounded-lg text-sm hover:bg-white/10 transition-colors"
                >
                  Apply
                </button>
              </div>
              {discountMessage && (
                <p
                  className={`text-xs mt-2 ${discountValid ? "text-green-400" : "text-red-400"}`}
                >
                  {discountMessage}
                </p>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span className="flex items-center gap-1">
                    Discount
                    <button
                      onClick={() => {
                        setDiscountCode("");
                        setDiscountMessage("");
                        setDiscountValid(null);
                      }}
                      className="hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-border pt-3 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Email & checkout */}
            <div className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-neon-orange/50 transition-colors"
                placeholder="Your email address"
                required
              />
              <button
                onClick={handleCheckout}
                disabled={loading || !email}
                className="w-full gradient-bg rounded-lg py-3 font-semibold text-white btn-glow transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Checkout
                  </>
                )}
              </button>
              <p className="text-xs text-text-muted text-center">
                Secure payment powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
