"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  DollarSign,
  Users,
  CreditCard,
  ShoppingCart,
  TrendingUp,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface AdminStats {
  totalRevenue: number;
  totalCustomers: number;
  activeSubscriptions: number;
  totalOrders: number;
  recentOrders: Array<{
    id: string;
    customer_email: string;
    product_name: string;
    amount: number;
    status: string;
    created_at: string;
  }>;
}

interface SignalForm {
  product_type: "indicator" | "algorithm";
  signal_type: "buy" | "sell" | "update";
  instrument: string;
  price: string;
  timeframe: string;
  confidence: string;
  message: string;
  chart_symbol: string;
}

const DEFAULT_FORM: SignalForm = {
  product_type: "algorithm",
  signal_type: "buy",
  instrument: "ES",
  price: "",
  timeframe: "",
  confidence: "",
  message: "",
  chart_symbol: "",
};

function SendSignalPanel() {
  const [form, setForm] = useState<SignalForm>(DEFAULT_FORM);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [recentSignals, setRecentSignals] = useState<
    Array<{
      id: string;
      product_type: string;
      signal_type: string;
      instrument: string;
      price: number | null;
      message: string | null;
      delivered: boolean;
      created_at: string;
    }>
  >([]);

  useEffect(() => {
    fetchRecentSignals();
  }, []);

  async function fetchRecentSignals() {
    try {
      const res = await fetch("/api/admin/signals");
      if (res.ok) {
        const data = await res.json();
        setRecentSignals(data.slice(0, 10));
      }
    } catch {
      // ignore
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/signals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setResult({ success: true, message: "Signal queued — bot will deliver within 30 seconds." });
        setForm(DEFAULT_FORM);
        fetchRecentSignals();
      } else {
        const err = await res.json();
        setResult({ success: false, message: err.error || "Failed to send signal." });
      }
    } catch {
      setResult({ success: false, message: "Network error." });
    } finally {
      setSending(false);
    }
  }

  const isUpdate = form.signal_type === "update";

  return (
    <div className="glass rounded-xl p-6 mb-8">
      <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
        <Send className="w-5 h-5 text-neon-orange" />
        Send Signal / Announcement
      </h2>
      <p className="text-text-muted text-sm mb-6">
        Push a trading signal or announcement to all premium subscribers via the Discord bot.
      </p>

      <form onSubmit={handleSend} className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          {/* Product Type */}
          <div>
            <label className="block text-xs text-text-muted mb-1">Product Type</label>
            <select
              value={form.product_type}
              onChange={(e) =>
                setForm((f) => ({ ...f, product_type: e.target.value as "indicator" | "algorithm" }))
              }
              className="w-full bg-surface-light border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-orange"
            >
              <option value="algorithm">Algorithm</option>
              <option value="indicator">Indicator</option>
            </select>
          </div>

          {/* Signal Type */}
          <div>
            <label className="block text-xs text-text-muted mb-1">Signal Type</label>
            <select
              value={form.signal_type}
              onChange={(e) =>
                setForm((f) => ({ ...f, signal_type: e.target.value as "buy" | "sell" | "update" }))
              }
              className="w-full bg-surface-light border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-orange"
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
              <option value="update">Update / Announcement</option>
            </select>
          </div>

          {/* Instrument */}
          <div>
            <label className="block text-xs text-text-muted mb-1">Instrument</label>
            <select
              value={form.instrument}
              onChange={(e) => setForm((f) => ({ ...f, instrument: e.target.value }))}
              className="w-full bg-surface-light border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-orange"
            >
              <option value="ES">ES (S&P 500 Futures)</option>
              <option value="NQ">NQ (Nasdaq Futures)</option>
              <option value="MES">MES (Micro E-mini S&P)</option>
              <option value="MNQ">MNQ (Micro E-mini NQ)</option>
            </select>
          </div>
        </div>

        {!isUpdate && (
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-text-muted mb-1">Price Level (optional)</label>
              <input
                type="number"
                step="0.25"
                placeholder="e.g. 5945.25"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="w-full bg-surface-light border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-orange"
              />
            </div>
            {form.product_type === "indicator" && (
              <>
                <div>
                  <label className="block text-xs text-text-muted mb-1">Timeframe (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 5m, 15m, 1H"
                    value={form.timeframe}
                    onChange={(e) => setForm((f) => ({ ...f, timeframe: e.target.value }))}
                    className="w-full bg-surface-light border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-orange"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-muted mb-1">Confidence % (optional)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    placeholder="e.g. 85"
                    value={form.confidence}
                    onChange={(e) => setForm((f) => ({ ...f, confidence: e.target.value }))}
                    className="w-full bg-surface-light border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-orange"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {form.product_type === "indicator" && !isUpdate && (
          <div>
            <label className="block text-xs text-text-muted mb-1">Chart Symbol (optional, for TradingView snapshot)</label>
            <input
              type="text"
              placeholder="e.g. CME_MINI:ES1!"
              value={form.chart_symbol}
              onChange={(e) => setForm((f) => ({ ...f, chart_symbol: e.target.value }))}
              className="w-full bg-surface-light border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-orange"
            />
          </div>
        )}

        <div>
          <label className="block text-xs text-text-muted mb-1">
            {isUpdate ? "Announcement Message" : "Additional Message (optional)"}
          </label>
          <textarea
            rows={3}
            placeholder={
              isUpdate
                ? "Write your announcement here..."
                : "Any extra context to include in the signal embed..."
            }
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            required={isUpdate}
            className="w-full bg-surface-light border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-orange resize-none"
          />
        </div>

        {result && (
          <div
            className={`flex items-center gap-2 text-sm p-3 rounded-lg ${
              result.success
                ? "bg-green-500/10 border border-green-500/20 text-green-400"
                : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}
          >
            {result.success ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            {result.message}
          </div>
        )}

        <button
          type="submit"
          disabled={sending}
          className="gradient-bg text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 btn-glow hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          {sending ? "Sending..." : "Send Signal"}
        </button>
      </form>

      {/* Recent signals */}
      {recentSignals.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-sm font-medium text-text-muted mb-3">Recent Signals</h3>
          <div className="space-y-2">
            {recentSignals.map((sig) => (
              <div key={sig.id} className="flex items-center justify-between text-xs py-2 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-1.5 py-0.5 rounded font-bold uppercase ${
                      sig.signal_type === "buy"
                        ? "bg-green-500/20 text-green-400"
                        : sig.signal_type === "sell"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {sig.signal_type}
                  </span>
                  <span className="text-text-secondary">{sig.instrument}</span>
                  <span className="text-text-muted capitalize">{sig.product_type}</span>
                  {sig.price && <span className="text-text-muted">@ {sig.price}</span>}
                </div>
                <div className="flex items-center gap-2 text-text-muted">
                  <span
                    className={`px-1.5 py-0.5 rounded ${
                      sig.delivered ? "text-green-400" : "text-yellow-400"
                    }`}
                  >
                    {sig.delivered ? "Delivered" : "Pending"}
                  </span>
                  <span>{new Date(sig.created_at).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/dashboard");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch {
        // Will show empty state
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const statCards = [
    {
      label: "Total Revenue",
      value: stats ? `$${stats.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "—",
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      label: "Customers",
      value: stats?.totalCustomers ?? "—",
      icon: Users,
      color: "text-blue-400",
    },
    {
      label: "Active Subscriptions",
      value: stats?.activeSubscriptions ?? "—",
      icon: CreditCard,
      color: "text-neon-orange",
    },
    {
      label: "Total Orders",
      value: stats?.totalOrders ?? "—",
      icon: ShoppingCart,
      color: "text-purple-400",
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-text-secondary mt-1">
          Overview of your Zappit AI business.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-text-muted">{stat.label}</span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold">
              {loading ? "—" : stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Send Signal panel */}
      <SendSignalPanel />

      {/* Recent orders */}
      <div className="glass rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-neon-orange" />
          Recent Orders
        </h2>

        {loading ? (
          <div className="text-text-muted text-center py-8">Loading...</div>
        ) : stats?.recentOrders?.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-text-muted font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-text-muted font-medium">Customer</th>
                  <th className="text-left py-3 px-4 text-text-muted font-medium">Product</th>
                  <th className="text-left py-3 px-4 text-text-muted font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-text-muted font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 text-text-secondary">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">{order.customer_email}</td>
                    <td className="py-3 px-4">{order.product_name}</td>
                    <td className="py-3 px-4">${order.amount.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          order.status === "completed"
                            ? "bg-green-500/10 text-green-400"
                            : order.status === "pending"
                              ? "bg-yellow-500/10 text-yellow-400"
                              : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-text-muted text-center py-8 flex flex-col items-center gap-2">
            <TrendingUp className="w-8 h-8 text-text-muted/50" />
            No orders yet.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
