"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 -28.5 256 256"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M216.856339 16.5966031C200.285002 8.84328665 182.566144 3.2084988 164.041564 0c-2.275879 4.11318426-4.926535 9.65236491-6.750873 14.0605979-19.6575 -2.9416255-39.1488-2.9416255-58.4418 0-1.8243-4.4082-4.5387-9.9473-6.8307-14.0605979C73.407076 3.2084988 55.6679924 8.86399117 39.0817511 16.6114032 5.61325447 67.146213-3.4440241 116.400813 1.08408905 164.955721c23.2022985 17.0484 45.7645 27.3767 67.9652 34.1168 5.4693-7.4975 10.3491-15.4474 14.5619-23.8134-7.9813-3.0108-15.6182-6.7268-22.8516-11.0908 1.9144-1.4072 3.7912-2.8583 5.5897-4.35 44.0994 20.9273 91.9444 20.9273 135.4964 0 1.8143 1.4917 3.691 2.9428 5.5899 4.35-7.249 4.3789-14.9026 8.0949-22.8836 11.1049 4.2129 8.352 9.0927 16.3166 14.562 23.814 22.2169-6.7401 44.799-17.0684 67.9916-34.1168 5.5543-56.3487-9.4789-105.1579-39.6677-148.35937zM85.4742097 135.09488C72.8486 135.09488 62.4 123.315 62.4 108.914c0-14.4014 10.2136-26.1991 22.0742-26.1991 11.8595 0 22.3079 11.7786 22.0742 26.1991.0142 14.401-10.2147 26.18005-21.074 26.18005zm78.0515 0c-12.6257 0-23.0742-11.779-23.0742-26.18005 0-14.4014 10.2136-26.1991 23.0742-26.1991 11.8606 0 22.3079 11.7786 22.0742 26.1991 0 14.401-10.2136 26.18005-22.0742 26.18005z" />
    </svg>
  );
}

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
        <DiscordIcon className="w-5 h-5 text-text-secondary group-hover:text-[#5865F2] transition-colors" />
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
