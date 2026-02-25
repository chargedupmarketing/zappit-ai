"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ShoppingCart, ChevronDown } from "lucide-react";

const VISIBLE_FEATURES = 4;

export interface PricingTier {
  billing: string;
  price: string;
  period: string;
  billedAs?: string | null;
  badge?: string;
  features: string[];
  href: string;
  highlighted?: boolean;
}

export default function PricingCard({ tier }: { tier: PricingTier }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = tier.features.length > VISIBLE_FEATURES;
  const visibleFeatures = expanded ? tier.features : tier.features.slice(0, VISIBLE_FEATURES);
  const hiddenCount = tier.features.length - VISIBLE_FEATURES;

  return (
    <div
      className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
        tier.highlighted
          ? "glass border-neon-orange/30 hover:border-neon-orange/50"
          : "glass glass-hover"
      }`}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="gradient-bg text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
            {tier.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-1">{tier.billing}</h4>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">{tier.price}</span>
          <span className="text-text-muted">{tier.period}</span>
        </div>
        {tier.billedAs ? (
          <p className="text-sm text-text-muted mt-1">{tier.billedAs}</p>
        ) : (
          <p className="text-sm mt-1 invisible select-none" aria-hidden>placeholder</p>
        )}
      </div>

      {/* Features — fills remaining space */}
      <div className="flex-1">
        <ul className="space-y-3">
          {visibleFeatures.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm">
              <Check className="w-4 h-4 text-neon-orange shrink-0" />
              <span className="text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>

        {hasMore && (
          <button
            onClick={() => setExpanded((p) => !p)}
            className="mt-4 flex items-center gap-1 text-xs text-text-muted hover:text-neon-orange transition-colors"
          >
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            />
            {expanded ? "Show less" : `Show ${hiddenCount} more feature${hiddenCount > 1 ? "s" : ""}`}
          </button>
        )}
      </div>

      {/* CTA — pinned to bottom */}
      <Link
        href={tier.href}
        className="mt-8 block w-full text-center rounded-full py-3 font-semibold transition-all duration-300 gradient-bg text-white btn-glow hover:scale-105"
      >
        <span className="inline-flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </span>
      </Link>
    </div>
  );
}
