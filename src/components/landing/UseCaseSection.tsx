"use client";

import { Building2, Wallet, Shield, TrendingUp, Target, Zap } from "lucide-react";

const useCases = [
  {
    icon: Building2,
    title: "Prop Firm Traders",
    subtitle: "Funded Accounts",
    description:
      "Pass your evaluation and stay funded with our prop-firm-compliant algorithms. Built to respect drawdown limits, daily loss caps, and consistency rules.",
    features: [
      { icon: Shield, text: "Drawdown protection built in" },
      { icon: Target, text: "Evaluation-optimized strategies" },
      { icon: TrendingUp, text: "Consistent daily performance" },
    ],
  },
  {
    icon: Wallet,
    title: "Personal Capital",
    subtitle: "Your Own Money",
    description:
      "Maximize your personal trading capital with aggressive yet calculated strategies. Full control over risk parameters with higher profit targets.",
    features: [
      { icon: Zap, text: "Higher profit potential" },
      { icon: Shield, text: "Customizable risk settings" },
      { icon: Target, text: "Scalable position sizing" },
    ],
  },
];

export default function UseCaseSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Built for{" "}
            <span className="gradient-text">How You Trade</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Different traders have different needs. Our products adapt to your
            trading style and capital structure.
          </p>
        </div>

        {/* Use case cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="glass rounded-2xl p-8 transition-all duration-300 hover:border-neon-orange/20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center">
                  <useCase.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{useCase.title}</h3>
                  <p className="text-sm text-neon-orange">{useCase.subtitle}</p>
                </div>
              </div>

              <p className="text-text-secondary leading-relaxed mb-6">
                {useCase.description}
              </p>

              <div className="space-y-3">
                {useCase.features.map((feature) => (
                  <div
                    key={feature.text}
                    className="flex items-center gap-3 text-sm"
                  >
                    <feature.icon className="w-4 h-4 text-neon-orange flex-shrink-0" />
                    <span className="text-text-secondary">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
