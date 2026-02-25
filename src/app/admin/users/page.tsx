"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Users, Search, CreditCard, Package } from "lucide-react";

interface AdminCustomer {
  id: string;
  email: string;
  name: string;
  active_subscriptions: number;
  total_orders: number;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch {
      // Error state
    } finally {
      setLoading(false);
    }
  }

  const filtered = users.filter(
    (user) =>
      !search ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-text-secondary mt-1">
          View and manage customer accounts.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-neon-orange/50"
            placeholder="Search by name or email..."
          />
        </div>
      </div>

      {loading ? (
        <div className="text-text-muted text-center py-12">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <Users className="w-12 h-12 text-text-muted/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Users Found</h3>
          <p className="text-text-muted text-sm">
            {users.length === 0
              ? "Customer accounts will appear here after registration."
              : "No users match your search."}
          </p>
        </div>
      ) : (
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-6 text-text-muted font-medium">Customer</th>
                <th className="text-left py-4 px-6 text-text-muted font-medium">Email</th>
                <th className="text-left py-4 px-6 text-text-muted font-medium">Subscriptions</th>
                <th className="text-left py-4 px-6 text-text-muted font-medium">Orders</th>
                <th className="text-left py-4 px-6 text-text-muted font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-0 hover:bg-white/[0.02]">
                  <td className="py-4 px-6 font-medium">
                    {user.name || "—"}
                  </td>
                  <td className="py-4 px-6 text-text-secondary">
                    {user.email}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1">
                      <CreditCard className="w-3 h-3 text-text-muted" />
                      {user.active_subscriptions}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1">
                      <Package className="w-3 h-3 text-text-muted" />
                      {user.total_orders}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-text-secondary">
                    {new Date(user.created_at).toLocaleDateString()}
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
