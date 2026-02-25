"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  Check,
  Zap,
  Shield,
  Settings,
  TrendingUp,
  Clock,
  Star,
  Building2,
  Wallet,
} from "lucide-react";
import TopControls from "@/components/landing/TopControls";
import PricingCard from "@/components/shared/PricingCard";

const features = [
  {
    icon: Bot,
    title: "Fully Automated Execution",
    description:
      "The algorithm monitors the market 24/7 and executes trades automatically — entries, exits, stop-losses, and take-profits — without you touching a button.",
  },
  {
    icon: Shield,
    title: "Built-In Risk Management",
    description:
      "Daily loss limits, max drawdown controls, and position sizing are all handled automatically. The algorithm protects your account even when you're asleep.",
  },
  {
    icon: Building2,
    title: "Prop Firm Compliant",
    description:
      "Designed to respect Apex Trader Funding evaluation rules out of the box — drawdown limits, consistency rules, and daily loss caps are all enforced automatically.",
  },
  {
    icon: Settings,
    title: "Custom Parameter Tuning",
    description:
      "Adjust aggression levels, session filters, and risk multipliers to match your account size and goals. Full control without writing a single line of code.",
  },
  {
    icon: Clock,
    title: "Session-Aware Trading",
    description:
      "Configured for optimal ES & NQ futures sessions. The algorithm only trades when market conditions are most favorable, avoiding low-liquidity periods.",
  },
  {
    icon: TrendingUp,
    title: "AI-Optimized Entries",
    description:
      "Entry logic is continuously optimized against live market data. The algorithm adapts its approach as market conditions evolve.",
  },
];

const pricing = [
  {
    billing: "Monthly",
    price: "$149",
    period: "/month",
    billedAs: null,
    badge: "MOST POPULAR",
    features: [
      "Fully automated trading",
      "ES & NQ futures",
      "Prop firm compliant",
      "Risk management built-in",
      "Discord community access",
      "Priority support",
    ],
    href: "/cart?product=algorithm&billing=monthly",
    highlighted: false,
    popular: true,
  },
  {
    billing: "Yearly",
    price: "$99",
    period: "/month",
    billedAs: "$1,188 billed annually",
    badge: "BEST VALUE",
    features: [
      "Fully automated trading",
      "ES & NQ futures",
      "Prop firm compliant",
      "Risk management built-in",
      "Discord community access",
      "Priority support",
      "Custom parameter tuning",
      "Save 34% vs monthly",
    ],
    href: "/cart?product=algorithm&billing=yearly",
    highlighted: true,
  },
  {
    billing: "Lifetime",
    price: "$2,997",
    period: "one-time",
    billedAs: "Pay once, own forever",
    features: [
      "Fully automated trading",
      "ES & NQ futures",
      "Prop firm compliant",
      "Risk management built-in",
      "Discord community access",
      "Priority support",
      "Custom parameter tuning",
      "All future updates free",
      "1-on-1 setup call",
    ],
    href: "/cart?product=algorithm&billing=lifetime",
    highlighted: false,
  },
];

const audiences = [
  {
    icon: Building2,
    title: "Prop Firm Traders",
    points: [
      "Pass evaluations without screen time",
      "Automatic daily loss cap enforcement",
      "Consistent drawdown-respecting performance",
      "Compatible with Apex Trader Funding",
    ],
  },
  {
    icon: Wallet,
    title: "Personal Capital",
    points: [
      "Compound your account on autopilot",
      "Customizable risk for your goals",
      "Trade while you work or sleep",
      "Scale position sizes as you grow",
    ],
  },
];

const faqs = [
  {
    q: "Do I need to be at my computer while it trades?",
    a: "No. The algorithm runs on your trading platform and executes fully autonomously. You can check results at the end of the day.",
  },
  {
    q: "What platform does the algorithm run on?",
    a: "The algorithm is delivered for NinjaTrader and compatible with Rithmic and Tradovate execution. Setup instructions are included and a 1-on-1 call is included with the Lifetime plan.",
  },
  {
    q: "Will this work on my prop firm account?",
    a: "Yes. The algorithm includes built-in enforcement of Apex Trader Funding drawdown and daily loss rules. It will automatically stop trading if you approach your limits.",
  },
  {
    q: "Can I adjust how aggressive the algorithm trades?",
    a: "Yes. You can configure session filters, risk multipliers, max daily trades, and more from a simple settings panel — no coding required.",
  },
  {
    q: "What markets does it trade?",
    a: "ES (S&P 500 E-mini) and NQ (Nasdaq 100 E-mini) futures. These are the most liquid futures markets and ideal for algorithmic trading.",
  },
];

export default function AlgorithmsPage() {
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
              <Bot className="w-10 h-10 text-white" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold gradient-bg text-white mb-3">
                Algorithms
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                AI Trading{" "}
                <span className="gradient-text">Algorithms</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
                Fully automated trading systems that execute on ES &amp; NQ futures
                24/7 on your behalf. Set your parameters, walk away, and check your
                results — no screen time required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="glass rounded-xl p-6 hover:border-neon-orange/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                  <a.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-white">{a.title}</h3>
              </div>
              <ul className="space-y-2">
                {a.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-text-secondary">
                    <Check className="w-4 h-4 text-neon-orange flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">
            How the Algorithm{" "}
            <span className="gradient-text">Works for You</span>
          </h2>
          <p className="text-text-secondary text-center mb-10 max-w-xl mx-auto">
            Everything you need for hands-free futures trading — built in, not bolted on.
          </p>
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
            <Star className="w-10 h-10 text-neon-orange mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Let the Algorithm{" "}
              <span className="gradient-text">Trade for You</span>
            </h2>
            <p className="text-text-secondary mb-8">
              Stop watching charts. Start automating your edge on ES &amp; NQ futures.
            </p>
            <Link
              href="/cart?product=algorithm&billing=yearly"
              className="gradient-bg rounded-full px-8 py-4 font-semibold text-white btn-glow transition-all hover:scale-105 inline-flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Get Started — $99/mo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
