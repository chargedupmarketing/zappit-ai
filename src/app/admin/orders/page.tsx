"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { ShoppingCart, Search } from "lucide-react";

interface AdminOrder {
  id: string;
  customer_email: string;
  product_name: string;
  amount: number;
  status: string;
  created_at: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const res = await fetch("/api/admin/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch {
      // Error state
    } finally {
      setLoading(false);
    }
  }

  const filtered = orders.filter((order) => {
    const matchesSearch =
      !search ||
      order.customer_email.toLowerCase().includes(search.toLowerCase()) ||
      order.product_name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-text-secondary mt-1">
          View and manage all customer orders.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-neon-orange/50"
            placeholder="Search by email or product..."
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white/5 border border-border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-orange/50"
        >
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

      {loading ? (
        <div className="text-text-muted text-center py-12">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <ShoppingCart className="w-12 h-12 text-text-muted/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Orders Found</h3>
          <p className="text-text-muted text-sm">
            {orders.length === 0
              ? "Orders will appear here when customers make purchases."
              : "No orders match your current filters."}
          </p>
        </div>
      ) : (
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-6 text-text-muted font-medium">Date</th>
                <th className="text-left py-4 px-6 text-text-muted font-medium">Customer</th>
                <th className="text-left py-4 px-6 text-text-muted font-medium">Product</th>
                <th className="text-left py-4 px-6 text-text-muted font-medium">Amount</th>
                <th className="text-left py-4 px-6 text-text-muted font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-white/[0.02]">
                  <td className="py-4 px-6 text-text-secondary">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">{order.customer_email}</td>
                  <td className="py-4 px-6">{order.product_name}</td>
                  <td className="py-4 px-6">${order.amount.toFixed(2)}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        order.status === "completed"
                          ? "bg-green-500/10 text-green-400"
                          : order.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : order.status === "refunded"
                              ? "bg-blue-500/10 text-blue-400"
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
      )}
    </AdminLayout>
  );
}
