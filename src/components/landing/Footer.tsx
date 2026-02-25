"use client";

import Link from "next/link";
import { Zap, MessageCircle } from "lucide-react";

const footerLinks = [
  { label: "Products", href: "#products" },
  { label: "Pricing", href: "#pricing" },
  { label: "Cart", href: "/cart" },
  { label: "Login", href: "/login" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4 group"
            >
              <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-glow">
                Zappit AI
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              AI-powered trading indicators and algorithms for ES &amp; NQ
              futures. Built for prop firm traders and personal capital
              investors.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-muted text-sm hover:text-neon-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold text-white mb-4">Community</h4>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Join our Discord server for trade ideas, strategy discussions, and
              direct support from the Zappit AI team.
            </p>
            <Link
              href="https://discord.gg/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 glass glass-hover rounded-full px-5 py-2.5 text-sm text-text-secondary hover:text-neon-orange transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Join Discord
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} Zappit AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-text-muted">
            <Link
              href="/privacy"
              className="hover:text-neon-orange transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/faq"
              className="hover:text-neon-orange transition-colors"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
