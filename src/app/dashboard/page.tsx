"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  CreditCard,
  Package,
  TrendingUp,
  Clock,
  Copy,
  Check,
  RefreshCw,
  Unlink,
} from "lucide-react";

interface DashboardData {
  activeSubscriptions: number;
  totalOrders: number;
  recentOrders: Array<{
    id: string;
    product_name: string;
    amount: number;
    status: string;
    created_at: string;
  }>;
}

interface DiscordStatus {
  linked: boolean;
  discord_username?: string;
  linked_at?: string;
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.102 18.079.114 18.1.132 18.113a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
  );
}

function ConnectDiscordCard() {
  const [discordStatus, setDiscordStatus] = useState<DiscordStatus | null>(null);
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [tokenExpiry, setTokenExpiry] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [unlinking, setUnlinking] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchStatus();
  }, []);

  async function fetchStatus() {
    try {
      const token = localStorage.getItem("zappit-token");
      const res = await fetch("/api/discord/status", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setDiscordStatus(await res.json());
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function generateToken() {
    setGenerating(true);
    try {
      const token = localStorage.getItem("zappit-token");
      const res = await fetch("/api/discord/generate-link-token", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setLinkToken(data.token);
        setTokenExpiry(new Date(data.expires_at));
      }
    } catch {
      // ignore
    } finally {
      setGenerating(false);
    }
  }

  async function unlinkDiscord() {
    setUnlinking(true);
    try {
      const token = localStorage.getItem("zappit-token");
      await fetch("/api/discord/status", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setDiscordStatus({ linked: false });
      setLinkToken(null);
    } catch {
      // ignore
    } finally {
      setUnlinking(false);
    }
  }

  function copyToken() {
    if (linkToken) {
      navigator.clipboard.writeText(linkToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const minutesLeft = tokenExpiry
    ? Math.max(0, Math.round((tokenExpiry.getTime() - Date.now()) / 60000))
    : 0;

  return (
    <div className="glass rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
        <DiscordIcon className="w-5 h-5 text-[#5865F2]" />
        Connect Discord
      </h2>
      <p className="text-text-muted text-sm mb-4">
        Link your Zappit AI subscription to Discord for premium bot features — buy/sell signal
        alerts, indicator notifications, and chart snapshots.
      </p>

      {loading ? (
        <div className="text-text-muted text-sm">Loading...</div>
      ) : discordStatus?.linked ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <div>
              <div className="text-sm font-medium text-green-400">Connected</div>
              {discordStatus.discord_username && (
                <div className="text-xs text-text-muted">@{discordStatus.discord_username}</div>
              )}
            </div>
          </div>
          <div className="text-xs text-text-muted">
            Run <code className="bg-white/10 px-1 py-0.5 rounded">/status</code> in Discord to see
            your subscription tier and active notifications.
          </div>
          <button
            onClick={unlinkDiscord}
            disabled={unlinking}
            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            <Unlink className="w-4 h-4" />
            {unlinking ? "Unlinking..." : "Unlink Discord"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-text-muted">
            1. Generate a link token below.
            <br />
            2. In any Discord server with the Zappit bot, run:
            <code className="block bg-white/10 rounded px-2 py-1.5 mt-1 font-mono text-orange-400">
              /link YOUR_TOKEN
            </code>
            3. Your subscription tier will be verified and premium features unlocked.
          </div>

          {linkToken ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-border font-mono text-lg tracking-widest">
                <span className="flex-1 text-center text-orange-400">{linkToken}</span>
                <button
                  onClick={copyToken}
                  className="text-text-muted hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-text-muted text-center">
                Expires in {minutesLeft} minute{minutesLeft !== 1 ? "s" : ""} &middot;{" "}
                <button
                  onClick={generateToken}
                  className="text-neon-orange hover:underline"
                >
                  Regenerate
                </button>
              </p>
            </div>
          ) : (
            <button
              onClick={generateToken}
              disabled={generating}
              className="gradient-bg text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 btn-glow hover:scale-105 transition-transform text-sm"
            >
              <RefreshCw className={`w-4 h-4 ${generating ? "animate-spin" : ""}`} />
              {generating ? "Generating..." : "Get Link Token"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const token = localStorage.getItem("zappit-token");
        const res = await fetch("/api/customer/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch {
        // Dashboard data will be empty
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const stats = [
    {
      label: "Active Subscriptions",
      value: data?.activeSubscriptions ?? 0,
      icon: CreditCard,
    },
    {
      label: "Total Orders",
      value: data?.totalOrders ?? 0,
      icon: Package,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back{user?.name ? `, ${user.name}` : ""}</h1>
        <p className="text-text-secondary mt-1">
          Here&apos;s an overview of your Zappit AI account.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-text-muted">{stat.label}</span>
              <stat.icon className="w-5 h-5 text-neon-orange" />
            </div>
            <div className="text-3xl font-bold">
              {loading ? "—" : stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Discord Connect Card */}
      <div className="mb-8">
        <ConnectDiscordCard />
      </div>

      {/* Recent orders */}
      <div className="glass rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-neon-orange" />
          Recent Orders
        </h2>

        {loading ? (
          <div className="text-text-muted text-sm py-8 text-center">
            Loading...
          </div>
        ) : data?.recentOrders?.length ? (
          <div className="space-y-3">
            {data.recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div>
                  <div className="font-medium">{order.product_name}</div>
                  <div className="text-sm text-text-muted">
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${order.amount.toFixed(2)}</div>
                  <div
                    className={`text-xs font-medium ${
                      order.status === "completed"
                        ? "text-green-400"
                        : order.status === "pending"
                          ? "text-yellow-400"
                          : "text-red-400"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-text-muted text-sm py-8 text-center flex flex-col items-center gap-2">
            <TrendingUp className="w-8 h-8 text-text-muted/50" />
            No orders yet. Browse our products to get started.
          </div>
        )}
      </div>
    </div>
  );
}
