"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Zap, ArrowRight, Loader2 } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-neon-orange" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 grid-bg">
      <div className="max-w-md w-full text-center">
        <div className="glass rounded-2xl p-10">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>

          <h1 className="text-3xl font-bold mb-3">Payment Successful!</h1>
          <p className="text-text-secondary mb-8">
            Thank you for your purchase. Your products are now available in your
            dashboard.
          </p>

          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="w-full gradient-bg rounded-lg py-3 font-semibold text-white btn-glow transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="w-full glass glass-hover rounded-lg py-3 font-medium text-text-secondary hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-neon-orange" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
