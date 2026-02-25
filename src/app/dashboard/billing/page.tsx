"use client";

import { useEffect, useState } from "react";
import { FileText, ExternalLink, DollarSign } from "lucide-react";

interface BillingRecord {
  id: string;
  product_name: string;
  amount: number;
  status: string;
  created_at: string;
}

export default function BillingPage() {
  const [records, setRecords] = useState<BillingRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("zappit-token");
        const res = await fetch("/api/customer/billing", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setRecords(data.orders || []);
        }
      } catch {
        // Will show empty state
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleManageBilling() {
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
          <h1 className="text-3xl font-bold">Billing History</h1>
          <p className="text-text-secondary mt-1">
            View your payment history and manage billing.
          </p>
        </div>
        <button
          onClick={handleManageBilling}
          className="gradient-bg rounded-lg px-5 py-2.5 text-sm font-semibold text-white btn-glow transition-all hover:scale-105 inline-flex items-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Stripe Portal
        </button>
      </div>

      {loading ? (
        <div className="text-text-muted text-center py-12">Loading...</div>
      ) : records.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <FileText className="w-12 h-12 text-text-muted/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Billing History</h3>
          <p className="text-text-muted text-sm">
            Your payment history will appear here after your first purchase.
          </p>
        </div>
      ) : (
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-6 text-text-muted font-medium">Date</th>
                <th className="text-left py-4 px-6 text-text-muted font-medium">Product</th>
                <th className="text-left py-4 px-6 text-text-muted font-medium">Amount</th>
                <th className="text-left py-4 px-6 text-text-muted font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="border-b border-border last:border-0">
                  <td className="py-4 px-6 text-text-secondary">
                    {new Date(record.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">{record.product_name}</td>
                  <td className="py-4 px-6 flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-text-muted" />
                    {record.amount.toFixed(2)}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        record.status === "completed"
                          ? "bg-green-500/10 text-green-400"
                          : record.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
