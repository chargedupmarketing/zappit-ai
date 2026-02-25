"use client";

import { useEffect, useState } from "react";
import { CreditCard, AlertCircle, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import type { Subscription } from "@/lib/types";

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("zappit-token");
        const res = await fetch("/api/customer/subscriptions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setSubscriptions(data.subscriptions || []);
        }
      } catch {
        // Will show empty state
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; label: string }> = {
    active: { icon: CheckCircle, color: "text-green-400", label: "Active" },
    cancelled: { icon: XCircle, color: "text-red-400", label: "Cancelled" },
    past_due: { icon: AlertCircle, color: "text-yellow-400", label: "Past Due" },
    incomplete: { icon: AlertCircle, color: "text-yellow-400", label: "Incomplete" },
  };

  async function handleManage() {
    try {
      const token = localStorage.getItem("zappit-token");
      const res = await fetch("/api/customer/billing-portal", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) window.location.href = data.url;
      }
    } catch {
      // Portal creation failed
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Subscriptions</h1>
          <p className="text-text-secondary mt-1">
            Manage your active subscriptions and billing.
          </p>
        </div>
        <button
          onClick={handleManage}
          className="gradient-bg rounded-lg px-5 py-2.5 text-sm font-semibold text-white btn-glow transition-all hover:scale-105 inline-flex items-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Manage Billing
        </button>
      </div>

      {loading ? (
        <div className="text-text-muted text-center py-12">Loading...</div>
      ) : subscriptions.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <CreditCard className="w-12 h-12 text-text-muted/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Active Subscriptions</h3>
          <p className="text-text-muted text-sm">
            Subscribe to our indicators or algorithms to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((sub) => {
            const status = statusConfig[sub.status] || statusConfig.incomplete;
            const StatusIcon = status.icon;

            return (
              <div key={sub.id} className="glass rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {sub.product?.name || "Product"}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <StatusIcon className={`w-4 h-4 ${status.color}`} />
                      <span className={`text-sm ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    {sub.current_period_end && (
                      <div className="text-sm text-text-muted">
                        {sub.cancel_at_period_end
                          ? "Cancels"
                          : "Renews"}{" "}
                        {new Date(sub.current_period_end).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
