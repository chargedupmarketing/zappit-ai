"use client";

import { Monitor, BarChart3 } from "lucide-react";

const platforms = [
  {
    name: "TradingView",
    icon: BarChart3,
    description: "Full indicator integration with Pine Script",
  },
  {
    name: "Apex",
    icon: Monitor,
    description: "Compatible with Apex Trader Funding",
  },
];

export default function PlatformSection() {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-text-muted text-sm uppercase tracking-widest mb-8">
          Works with your favorite platforms
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="flex items-center gap-4 glass rounded-xl px-8 py-5 transition-all duration-300 hover:border-neon-orange/20"
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                <platform.icon className="w-6 h-6 text-neon-orange" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">
                  {platform.name}
                </div>
                <div className="text-sm text-text-muted">
                  {platform.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
