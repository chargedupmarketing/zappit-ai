"use client";

const platforms = [
  {
    name: "TradingView",
    description: "Pine Script indicators",
    logo: (
      <svg viewBox="0 0 100 100" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M50 5C25.15 5 5 25.15 5 50s20.15 45 45 45 45-20.15 45-45S74.85 5 50 5z"
          fill="#2962FF"
        />
        <path
          d="M22 64l14-14 10 10 16-22 16 26H22z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "Apex Trader Funding",
    description: "Prop firm evaluations",
    logo: (
      <svg viewBox="0 0 100 100" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="18" fill="#00D4FF" />
        <path d="M50 15L75 75H25L50 15Z" fill="white" />
        <path d="M50 40L62 68H38L50 40Z" fill="#00D4FF" />
      </svg>
    ),
  },
  {
    name: "NinjaTrader",
    description: "Automated strategy execution",
    logo: (
      <svg viewBox="0 0 100 100" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="18" fill="#1A1A2E" />
        <path d="M20 75V25l20 30V25h20v50L40 45v30H20z" fill="#E63946" />
        <rect x="65" y="25" width="15" height="50" rx="4" fill="#E63946" />
      </svg>
    ),
  },
  {
    name: "Tradovate",
    description: "Cloud-based futures trading",
    logo: (
      <svg viewBox="0 0 100 100" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="18" fill="#0D1B2A" />
        <circle cx="50" cy="50" r="28" stroke="#4CAF50" strokeWidth="6" fill="none" />
        <path d="M35 50l10 10 20-20" stroke="#4CAF50" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "TopstepTrader",
    description: "Funded trader challenges",
    logo: (
      <svg viewBox="0 0 100 100" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="18" fill="#FF6B35" />
        <path d="M20 38h60M35 38v32h30V38" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="50" cy="38" r="8" fill="white" />
      </svg>
    ),
  },
  {
    name: "Rithmic",
    description: "Professional market data",
    logo: (
      <svg viewBox="0 0 100 100" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="18" fill="#1C2B3A" />
        <rect x="20" y="60" width="12" height="20" rx="3" fill="#00B4D8" />
        <rect x="38" y="45" width="12" height="35" rx="3" fill="#00B4D8" />
        <rect x="56" y="30" width="12" height="50" rx="3" fill="#0077B6" />
        <rect x="74" y="20" width="12" height="60" rx="3" fill="#0077B6" />
      </svg>
    ),
  },
  {
    name: "TradeStation",
    description: "Advanced charting & execution",
    logo: (
      <svg viewBox="0 0 100 100" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="18" fill="#003087" />
        <path d="M18 50h64M50 18v64" stroke="#FFB800" strokeWidth="8" strokeLinecap="round" />
        <circle cx="50" cy="50" r="12" fill="#FFB800" />
        <circle cx="50" cy="50" r="5" fill="#003087" />
      </svg>
    ),
  },
  {
    name: "Topstep",
    description: "Trade real capital, keep profits",
    logo: (
      <svg viewBox="0 0 100 100" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="18" fill="#1DB954" />
        <path d="M25 70L50 30l25 40H25z" fill="white" />
      </svg>
    ),
  },
  {
    name: "Webull",
    description: "Commission-free trading",
    logo: (
      <svg viewBox="0 0 100 100" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="18" fill="#00C4FF" />
        <path d="M20 65L32 35l12 20 10-15 12 20 12-25" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
];

export default function PlatformSection() {
  // Duplicate the list so the loop is seamless
  const doubled = [...platforms, ...platforms];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="text-center mb-10 px-6">
        <p className="text-white text-base sm:text-lg font-semibold tracking-widest uppercase platform-label-glow">
          Works with your favorite platforms
        </p>
      </div>

      {/* Scrolling track — mask fades edges transparently so no color mismatch */}
      <div
        className="overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
      <div className="flex carousel-track gap-6 w-max">
        {doubled.map((platform, i) => (
          <div
            key={`${platform.name}-${i}`}
            className="flex items-center gap-4 glass rounded-xl px-7 py-5 min-w-max hover:border-neon-orange/25 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
              {platform.logo}
            </div>
            <div className="text-left">
              <div className="font-semibold text-white text-sm whitespace-nowrap">
                {platform.name}
              </div>
              <div className="text-xs text-text-muted whitespace-nowrap mt-0.5">
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
