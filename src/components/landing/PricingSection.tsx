"use client";

import { Check, Zap, Star } from "lucide-react";
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
    href: "/cart?product=indicator&billing=monthly",
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
    href: "/cart?product=indicator&billing=yearly",
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
    href: "/cart?product=indicator&billing=lifetime",
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
    href: "/cart?product=algorithm&billing=monthly",
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
    href: "/cart?product=algorithm&billing=yearly",
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
    href: "/cart?product=algorithm&billing=lifetime",
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
            <span className="text-sm text-text-secondary">
              Simple Pricing
            </span>
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
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-center mb-8 text-text-secondary">
            Trading Indicators
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers
              .filter((t) => t.productType === "Indicators")
              .map((tier) => (
                <PricingCard key={tier.name} tier={tier} />
              ))}
          </div>
        </div>

        {/* Algorithms pricing */}
        <div>
          <h3 className="text-xl font-semibold text-center mb-8 text-text-secondary">
            Trading Algorithms
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
  const isHighlighted = tier.popular || tier.bestValue;

  return (
    <div
      className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] ${
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
        {tier.billedAs && (
          <p className="text-sm text-text-muted mt-1">{tier.billedAs}</p>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm">
            <Check className="w-4 h-4 text-neon-orange flex-shrink-0" />
            <span className="text-text-secondary">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={tier.href}
        className={`block w-full text-center rounded-full py-3 font-semibold transition-all duration-300 ${
          isHighlighted
            ? "gradient-bg text-white btn-glow hover:scale-105"
            : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
        }`}
      >
        <span className="inline-flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Get Started
        </span>
      </Link>
    </div>
  );
}
