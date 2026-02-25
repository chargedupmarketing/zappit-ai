"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Zap, HelpCircle } from "lucide-react";

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What is Zappit AI?",
        a: "Zappit AI provides AI-powered trading indicators and fully automated trading algorithms designed for ES & NQ futures markets. Our tools are built for both prop firm traders using funded accounts and personal capital investors.",
      },
      {
        q: "What markets do your products support?",
        a: "Our indicators and algorithms are specifically designed for ES (S&P 500 E-mini) and NQ (Nasdaq 100 E-mini) futures contracts.",
      },
      {
        q: "What platforms are supported?",
        a: "Our indicators work on TradingView and are compatible with Apex Trader Funding. Our algorithms support automated execution on compatible platforms.",
      },
    ],
  },
  {
    category: "Products & Pricing",
    questions: [
      {
        q: "What's the difference between indicators and algorithms?",
        a: "Indicators provide real-time buy/sell signals and analysis that you use to make manual trading decisions. Algorithms are fully automated trading systems that execute trades on your behalf based on our AI models — you set the parameters and the algorithm handles entries, exits, and risk management 24/7.",
      },
      {
        q: "What subscription plans do you offer?",
        a: "We offer Monthly, Yearly, and Lifetime options for both our indicators and algorithms. Yearly plans offer significant savings compared to monthly, and lifetime plans provide one-time payment access with all future updates included.",
      },
      {
        q: "Can I switch between plans?",
        a: "Yes, you can upgrade or downgrade your subscription at any time through your dashboard. Changes take effect at the start of your next billing cycle.",
      },
      {
        q: "Do you offer a money-back guarantee?",
        a: "Yes, we offer a 7-day money-back guarantee on all plans. If you're not satisfied, contact us within 7 days for a full refund, no questions asked.",
      },
    ],
  },
  {
    category: "Prop Firm Trading",
    questions: [
      {
        q: "Are your products prop firm compliant?",
        a: "Yes, our algorithms include built-in drawdown protection, daily loss caps, and consistency rules designed to comply with major prop firm requirements including Apex Trader Funding evaluations.",
      },
      {
        q: "Can I use Zappit AI to pass my evaluation?",
        a: "Our algorithms are designed with prop firm evaluation parameters in mind. They include risk management features specifically tuned to respect drawdown limits and daily loss caps that prop firms require.",
      },
    ],
  },
  {
    category: "Account & Billing",
    questions: [
      {
        q: "How do I cancel my subscription?",
        a: "You can cancel your subscription anytime through your dashboard under the Subscriptions section, or through the Stripe billing portal. Your access continues until the end of your current billing period.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards through our secure Stripe payment processing. This includes Visa, Mastercard, American Express, and Discover.",
      },
      {
        q: "How do I access my products after purchase?",
        a: "After purchasing, log in to your dashboard at zappit.ai. Your products and access details will be available under the 'My Products' section.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  function toggleItem(key: string) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <div className="min-h-screen px-6 py-12 grid-bg">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted text-sm hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-text-secondary text-lg">
            Everything you need to know about Zappit AI.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category) => (
            <div key={category.category}>
              <h2 className="text-lg font-semibold text-neon-orange mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                {category.category}
              </h2>
              <div className="space-y-2">
                {category.questions.map((faq) => {
                  const key = `${category.category}-${faq.q}`;
                  const isOpen = openItems.has(key);

                  return (
                    <div key={key} className="glass rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                      >
                        <span className="font-medium pr-4">{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-text-secondary text-sm leading-relaxed border-t border-border pt-4">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 glass rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-text-secondary text-sm mb-4">
            Join our Discord community for direct support from the Zappit AI
            team.
          </p>
          <Link
            href="https://discord.gg/"
            target="_blank"
            className="gradient-bg rounded-full px-6 py-2.5 text-sm font-semibold text-white btn-glow transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Join Discord
          </Link>
        </div>
      </div>
    </div>
  );
}
