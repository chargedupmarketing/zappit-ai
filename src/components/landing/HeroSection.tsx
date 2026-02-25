"use client";

import { Zap, ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 grid-bg">
      {/* Hero glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-orange/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
          <Zap className="w-4 h-4 text-neon-orange" />
          <span className="text-sm text-text-secondary">
            AI-Powered Trading Technology
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up-delay-1 text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
          Trade Smarter with{" "}
          <span className="gradient-text text-glow whitespace-nowrap">Zappit AI</span>
        </h1>

        {/* Subtext */}
        <p className="animate-fade-in-up-delay-2 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          AI-powered indicators and fully automated trading algorithms for{" "}
          <span className="text-white font-medium">ES &amp; NQ futures</span>.
          Built for prop firm traders and personal capital investors.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#products"
            className="gradient-bg rounded-full px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 btn-glow inline-flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Explore Products
          </a>
          <a
            href="#pricing"
            className="glass glass-hover rounded-full px-8 py-4 text-lg font-medium text-text-secondary hover:text-white transition-all duration-300"
          >
            View Pricing
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in-up-delay-3">
          <div>
            <div className="text-2xl sm:text-3xl font-bold gradient-text">
              24/7
            </div>
            <div className="text-xs sm:text-sm text-text-muted mt-1">
              Automated Trading
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold gradient-text">
              ES &amp; NQ
            </div>
            <div className="text-xs sm:text-sm text-text-muted mt-1">
              Futures Markets
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold gradient-text">
              AI
            </div>
            <div className="text-xs sm:text-sm text-text-muted mt-1">
              Powered Signals
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator — pinned to the bottom of the section */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-5 h-5 text-text-muted" />
      </div>
    </section>
  );
}
