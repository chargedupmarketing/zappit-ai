"use client";

import { Zap } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative glass rounded-3xl p-12 sm:p-16 text-center overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/10 via-transparent to-dark-orange/5 pointer-events-none" />

          <div className="relative">
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-8">
              <Zap className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Start Trading{" "}
              <span className="gradient-text text-glow">Smarter</span> Today
            </h2>

            <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8">
              Join thousands of traders using Zappit AI to gain an edge in the
              futures markets. Get started in minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#pricing"
                className="gradient-bg rounded-full px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 btn-glow inline-flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Get Started Now
              </Link>
              <Link
                href="https://discord.gg/"
                target="_blank"
                className="glass glass-hover rounded-full px-8 py-4 text-lg font-medium text-text-secondary hover:text-white transition-all duration-300"
              >
                Join Our Discord
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
