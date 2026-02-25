"use client";

import Link from "next/link";
import { ShoppingCart, LogIn, MessageCircle } from "lucide-react";

export default function TopControls() {
  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
      <Link
        href="https://discord.gg/"
        target="_blank"
        rel="noopener noreferrer"
        className="glass glass-hover rounded-full p-3 transition-all duration-300 hover:scale-105 group"
        aria-label="Join Discord"
      >
        <MessageCircle className="w-5 h-5 text-text-secondary group-hover:text-neon-orange transition-colors" />
      </Link>

      <Link
        href="/cart"
        className="glass glass-hover rounded-full p-3 transition-all duration-300 hover:scale-105 group relative"
        aria-label="Shopping Cart"
      >
        <ShoppingCart className="w-5 h-5 text-text-secondary group-hover:text-neon-orange transition-colors" />
      </Link>

      <Link
        href="/login"
        className="gradient-bg rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 btn-glow"
      >
        Login
      </Link>
    </div>
  );
}
