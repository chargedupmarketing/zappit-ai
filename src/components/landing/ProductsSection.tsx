"use client";

import {
  BarChart3,
  Bot,
  TrendingUp,
  ArrowRight,
  Zap,
} from "lucide-react";
import Link from "next/link";

const products = [
  {
    icon: BarChart3,
    title: "Trading Indicators",
    description:
      "AI-powered indicators that identify high-probability trade setups in real-time. Get precise entry and exit signals for ES & NQ futures with configurable alerts.",
    features: [
      "Real-time buy/sell signals",
      "Multi-timeframe analysis",
      "Custom alert configurations",
      "Works on TradingView & Apex",
    ],
    cta: "Starting at $49/mo",
    href: "/products/indicators",
    badge: "Popular",
  },
  {
    icon: Bot,
    title: "Trading Algorithms",
    description:
      "Fully automated trading systems that execute trades on your behalf 24/7. Set it and forget it — our AI algorithms manage entries, exits, and risk management.",
    features: [
      "Fully automated execution",
      "Built-in risk management",
      "Prop firm compliant",
      "24/7 market monitoring",
    ],
    cta: "Starting at $149/mo",
    href: "/products/algorithms",
    badge: "Premium",
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <TrendingUp className="w-4 h-4 text-neon-orange" />
            <span className="text-sm text-text-secondary">Our Products</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Tools Built for{" "}
            <span className="gradient-text">Serious Traders</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Whether you want signals to guide your trades or a fully automated
            system, we have the solution for your trading style.
          </p>
        </div>

        {/* Product cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div
              key={product.title}
              className="glass glass-hover rounded-2xl p-8 transition-all duration-500 hover:scale-[1.02] group relative overflow-hidden"
            >
              {/* Glow accent on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                {/* Badge */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold gradient-bg text-white mb-6">
                  {product.badge}
                </span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6">
                  <product.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-text-secondary"
                    >
                      <Zap className="w-4 h-4 text-neon-orange flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={product.href}
                  className="inline-flex items-center gap-2 text-neon-orange font-semibold group-hover:gap-3 transition-all duration-300"
                >
                  {product.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
