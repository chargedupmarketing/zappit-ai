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
