"use client";

import { useState } from "react";
import { Check, Zap, Star, ChevronDown } from "lucide-react";
import Link from "next/link";

interface PricingTier {
  name: string;
  productType: string;
  billing: string;
  price: string;
  period: string;
  billedAs?: string;
  features: string[];
  popular?: boolean;
  bestValue?: boolean;
  href: string;
}

const VISIBLE_FEATURES = 4;

const pricingTiers: PricingTier[] = [
  {
    name: "Indicator Monthly",
    productType: "Indicators",
    billing: "Monthly",
    price: "$49",
    period: "/month",
    features: [
      "All AI trading indicators",
      "TradingView & Apex compatible",
      "Real-time alerts",
      "Discord community access",
      "Email support",
    ],
    href: "/products/indicators",
  },
  {
    name: "Indicator Yearly",
    productType: "Indicators",
    billing: "Yearly",
    price: "$29",
    period: "/month",
    billedAs: "$348 billed annually",
    features: [
      "All AI trading indicators",
      "TradingView & Apex compatible",
      "Real-time alerts",
      "Discord community access",
      "Priority support",
    ],
    bestValue: true,
    href: "/products/indicators",
  },
  {
    name: "Indicator Lifetime",
    productType: "Indicators",
    billing: "Lifetime",
    price: "$997",
    period: "one-time",
    features: [
      "All AI trading indicators",
      "TradingView & Apex compatible",
      "Real-time alerts",
      "Discord community access",
      "Priority support",
      "Lifetime updates",
    ],
    href: "/products/indicators",
  },
  {
    name: "Algorithm Monthly",
    productType: "Algorithms",
    billing: "Monthly",
    price: "$149",
    period: "/month",
    features: [
      "Fully automated trading",
      "ES & NQ futures",
      "Prop firm compliant",
      "Risk management built-in",
      "Discord community access",
      "Priority support",
    ],
    popular: true,
    href: "/products/algorithms",
  },
  {
    name: "Algorithm Yearly",
    productType: "Algorithms",
    billing: "Yearly",
    price: "$99",
    period: "/month",
    billedAs: "$1,188 billed annually",
    features: [
      "Fully automated trading",
      "ES & NQ futures",
      "Prop firm compliant",
      "Risk management built-in",
      "Discord community access",
      "Priority support",
      "Custom parameter tuning",
    ],
    bestValue: true,
    href: "/products/algorithms",
  },
  {
    name: "Algorithm Lifetime",
    productType: "Algorithms",
    billing: "Lifetime",
    price: "$2,997",
    period: "one-time",
    features: [
      "Fully automated trading",
      "ES & NQ futures",
      "Prop firm compliant",
      "Risk management built-in",
      "Discord community access",
      "Priority support",
      "Custom parameter tuning",
      "Lifetime updates",
      "1-on-1 setup call",
    ],
    href: "/products/algorithms",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Star className="w-4 h-4 text-neon-orange" />
            <span className="text-sm text-text-secondary">Simple Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Choose Your{" "}
            <span className="gradient-text">Trading Edge</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            No hidden fees. Cancel anytime. All plans include full access to
            their respective features.
          </p>
        </div>

        {/* Indicators pricing */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-white platform-label-glow">
            Trading Indicators
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {pricingTiers
              .filter((t) => t.productType === "Indicators")
              .map((tier) => (
                <PricingCard key={tier.name} tier={tier} />
              ))}
          </div>
        </div>

        {/* Algorithms pricing */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-white platform-label-glow">
            Trading Algorithms
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {pricingTiers
              .filter((t) => t.productType === "Algorithms")
              .map((tier) => (
                <PricingCard key={tier.name} tier={tier} />
              ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-neon-orange" />
            Cancel Anytime
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-neon-orange" />
            7-Day Money Back Guarantee
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-neon-orange" />
            Secure Checkout
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingCard({ tier }: { tier: PricingTier }) {
  const [expanded, setExpanded] = useState(false);
  const isHighlighted = tier.popular || tier.bestValue;
  const hasMore = tier.features.length > VISIBLE_FEATURES;
  const visibleFeatures = expanded ? tier.features : tier.features.slice(0, VISIBLE_FEATURES);
  const hiddenCount = tier.features.length - VISIBLE_FEATURES;

  return (
    <div
      className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
        isHighlighted
          ? "glass border-neon-orange/30 hover:border-neon-orange/50"
          : "glass glass-hover"
      }`}
    >
      {/* Badge */}
      {tier.bestValue && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="gradient-bg text-white text-xs font-bold px-4 py-1 rounded-full">
            BEST VALUE
          </span>
        </div>
      )}
      {tier.popular && !tier.bestValue && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="gradient-bg text-white text-xs font-bold px-4 py-1 rounded-full">
            MOST POPULAR
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
          /* Reserve the same height even when there's no billedAs line */
          <p className="text-sm mt-1 invisible select-none">placeholder</p>
        )}
      </div>

      {/* Features — grows to fill available space */}
      <div className="flex-1">
        <ul className="space-y-3">
          {visibleFeatures.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm">
              <Check className="w-4 h-4 text-neon-orange flex-shrink-0" />
              <span className="text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Show more / less toggle */}
        {hasMore && (
          <button
            onClick={() => setExpanded((p) => !p)}
            className="mt-4 flex items-center gap-1 text-xs text-text-muted hover:text-neon-orange transition-colors"
          >
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
            />
            {expanded
              ? "Show less"
              : `Show ${hiddenCount} more feature${hiddenCount > 1 ? "s" : ""}`}
          </button>
        )}
      </div>

      {/* CTA — always pinned to the bottom */}
      <Link
        href={tier.href}
        className="mt-8 block w-full text-center rounded-full py-3 font-semibold transition-all duration-300 gradient-bg text-white btn-glow hover:scale-105"
      >
        <span className="inline-flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Get Started
        </span>
      </Link>
    </div>
  );
}
