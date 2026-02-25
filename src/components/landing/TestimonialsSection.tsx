"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marcus T.",
    role: "Prop Firm Trader",
    quote:
      "Passed my Apex evaluation in 3 days using the Zappit algorithm. The built-in drawdown protection saved me from blowing the account multiple times.",
    rating: 5,
  },
  {
    name: "Jessica R.",
    role: "Futures Day Trader",
    quote:
      "The indicators are incredibly accurate on NQ. I've been able to cut my screen time in half while actually improving my win rate. Best investment in my trading career.",
    rating: 5,
  },
  {
    name: "David K.",
    role: "Personal Capital Investor",
    quote:
      "I was skeptical about automated trading, but the algorithm has been consistently profitable on ES futures. The risk management is top-notch.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Trusted by{" "}
            <span className="gradient-text">Real Traders</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            See what our community has to say about trading with Zappit AI.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="glass rounded-2xl p-8 transition-all duration-300 hover:border-neon-orange/20"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-neon-orange/30 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-neon-orange fill-neon-orange"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-text-secondary leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div>
                <div className="font-semibold text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-text-muted">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
