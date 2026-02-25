"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Check,
  Zap,
  Shield,
  Bell,
  TrendingUp,
  Monitor,
  Clock,
  Star,
} from "lucide-react";
import TopControls from "@/components/landing/TopControls";
import PricingCard from "@/components/shared/PricingCard";

const features = [
  {
    icon: TrendingUp,
    title: "Real-Time Buy/Sell Signals",
    description:
      "AI analyzes price action, volume, and market structure to generate precise entry and exit signals as they happen — no lag, no repainting.",
  },
  {
    icon: Clock,
    title: "Multi-Timeframe Analysis",
    description:
      "Signals are confirmed across multiple timeframes simultaneously, filtering out noise and giving you only the highest-probability setups.",
  },
  {
    icon: Bell,
    title: "Custom Alert Configurations",
    description:
      "Set alerts via email, SMS, or TradingView notifications. Never miss a setup even when you're away from your screen.",
  },
  {
    icon: Shield,
    title: "Built-In Risk Levels",
    description:
      "Each signal comes with a confidence score and suggested stop-loss/take-profit levels, so you always know your risk before entering.",
  },
  {
    icon: Monitor,
    title: "TradingView & Apex Compatible",
    description:
      "Works natively on TradingView via Pine Script. Fully compatible with Apex Trader Funding evaluation rules.",
  },
  {
    icon: Star,
    title: "Lifetime Updates Included",
    description:
      "Our indicators evolve with the market. All updates and new signal modules are pushed to your account automatically.",
  },
];

const pricing = [
  {
    billing: "Monthly",
    price: "$49",
    period: "/month",
    billedAs: null,
    features: [
      "All AI trading indicators",
      "TradingView & Apex compatible",
      "Real-time alerts",
      "Discord community access",
      "Email support",
    ],
    href: "/cart?product=indicator&billing=monthly",
    highlighted: false,
  },
  {
    billing: "Yearly",
    price: "$29",
    period: "/month",
    billedAs: "$348 billed annually",
    badge: "BEST VALUE",
    features: [
      "All AI trading indicators",
      "TradingView & Apex compatible",
      "Real-time alerts",
      "Discord community access",
      "Priority support",
      "Save 41% vs monthly",
    ],
    href: "/cart?product=indicator&billing=yearly",
    highlighted: true,
  },
  {
    billing: "Lifetime",
    price: "$997",
    period: "one-time",
    billedAs: "Pay once, own forever",
    features: [
      "All AI trading indicators",
      "TradingView & Apex compatible",
      "Real-time alerts",
      "Discord community access",
      "Priority support",
      "All future updates free",
    ],
    href: "/cart?product=indicator&billing=lifetime",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Which platforms do the indicators work on?",
    a: "Our indicators are built in Pine Script and work on TradingView. They are also fully compatible with Apex Trader Funding evaluations and funded accounts.",
  },
  {
    q: "Do the indicators repaint?",
    a: "No. All signals are confirmed on candle close, never mid-candle, so you will never see a signal disappear after the fact.",
  },
  {
    q: "Can I use these on a prop firm account?",
    a: "Yes. The indicators are designed with prop firm rules in mind — they do not use any prohibited techniques and work within standard drawdown constraints.",
  },
  {
    q: "What markets are supported?",
    a: "Primarily ES (S&P 500 E-mini) and NQ (Nasdaq 100 E-mini) futures, though the signals work on any liquid futures market.",
  },
];

export default function IndicatorsPage() {
  return (
    <div className="min-h-screen grid-bg">
      <TopControls />

      {/* Hero */}
      <section className="relative px-6 pt-24 pb-20">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-muted text-sm hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold gradient-bg text-white mb-3">
                Indicators
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                AI Trading{" "}
                <span className="gradient-text">Indicators</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
                AI-powered signals that identify high-probability setups in real-time
                on ES &amp; NQ futures. Precise entries, exits, and risk levels — delivered
                directly to TradingView and Apex.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center">
            Everything You Need to{" "}
            <span className="gradient-text">Read the Market</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="glass rounded-xl p-6 hover:border-neon-orange/20 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-lg gradient-bg flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">
            Choose Your Plan
          </h2>
          <p className="text-text-secondary text-center mb-10">
            Cancel anytime. 7-day money-back guarantee on all plans.
          </p>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {pricing.map((tier) => (
              <PricingCard key={tier.billing} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center">
            Common Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="glass rounded-xl p-6">
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center glass rounded-2xl p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Ready to Trade with{" "}
              <span className="gradient-text">AI Precision?</span>
            </h2>
            <p className="text-text-secondary mb-8">
              Join traders already using Zappit AI indicators on ES &amp; NQ futures.
            </p>
            <Link
              href="/cart?product=indicator&billing=yearly"
              className="gradient-bg rounded-full px-8 py-4 font-semibold text-white btn-glow transition-all hover:scale-105 inline-flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Get Started — $29/mo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
