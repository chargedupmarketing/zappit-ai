"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  CreditCard,
  Package,
  TrendingUp,
  Clock,
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
