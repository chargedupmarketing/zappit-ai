"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  X,
  Save,
} from "lucide-react";
import type { Product, ProductPrice } from "@/lib/types";

interface ProductWithPrices extends Product {
  prices?: ProductPrice[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductWithPrices[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ProductWithPrices | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    short_description: "",
    type: "indicator" as "indicator" | "algorithm",
    platform: "both" as "tradingview" | "apex" | "both",
    audience: "both" as "prop_firm" | "personal" | "both",
    status: "draft" as "active" | "draft" | "archived",
    featured: false,
    monthly_price: "",
    yearly_price: "",
    lifetime_price: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const res = await fetch("/api/admin/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch {
      // Error state
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(null);
    setForm({
      name: "",
      slug: "",
      description: "",
      short_description: "",
      type: "indicator",
      platform: "both",
      audience: "both",
      status: "draft",
      featured: false,
      monthly_price: "",
      yearly_price: "",
      lifetime_price: "",
    });
    setShowForm(true);
  }

  function openEdit(product: ProductWithPrices) {
    setEditing(product);
    const prices = product.prices || [];
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description,
      short_description: product.short_description,
      type: product.type,
      platform: product.platform,
      audience: product.audience,
      status: product.status,
      featured: product.featured,
      monthly_price: prices.find((p) => p.billing_type === "monthly")?.price.toString() || "",
      yearly_price: prices.find((p) => p.billing_type === "yearly")?.price.toString() || "",
      lifetime_price: prices.find((p) => p.billing_type === "lifetime")?.price.toString() || "",
    });
    setShowForm(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const method = editing ? "PUT" : "POST";
      const url = editing
        ? `/api/admin/products/${editing.id}`
        : "/api/admin/products";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setShowForm(false);
        loadProducts();
      }
    } catch {
      // Error saving
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) loadProducts();
    } catch {
      // Error deleting
    }
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-text-secondary mt-1">
            Manage your indicators and algorithms.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="gradient-bg rounded-lg px-5 py-2.5 text-sm font-semibold text-white btn-glow transition-all hover:scale-105 inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Product form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="glass rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {editing ? "Edit Product" : "New Product"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 rounded-lg hover:bg-white/5 text-text-muted hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        name: e.target.value,
                        slug: e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, ""),
                      });
                    }}
                    className="w-full bg-white/5 border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-orange/50"
                    placeholder="Product name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Slug</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full bg-white/5 border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-orange/50"
                    placeholder="product-slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Short Description</label>
                <input
                  type="text"
                  value={form.short_description}
                  onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                  className="w-full bg-white/5 border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-orange/50"
                  placeholder="Brief description for cards"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-white/5 border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-orange/50 min-h-[100px]"
                  placeholder="Full product description"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as typeof form.type })}
                    className="w-full bg-white/5 border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-orange/50"
                  >
                    <option value="indicator">Indicator</option>
                    <option value="algorithm">Algorithm</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Platform</label>
                  <select
                    value={form.platform}
                    onChange={(e) => setForm({ ...form, platform: e.target.value as typeof form.platform })}
                    className="w-full bg-white/5 border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-orange/50"
                  >
                    <option value="both">Both</option>
                    <option value="tradingview">TradingView</option>
                    <option value="apex">Apex</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Audience</label>
                  <select
                    value={form.audience}
                    onChange={(e) => setForm({ ...form, audience: e.target.value as typeof form.audience })}
                    className="w-full bg-white/5 border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-orange/50"
                  >
                    <option value="both">Both</option>
                    <option value="prop_firm">Prop Firm</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as typeof form.status })}
                    className="w-full bg-white/5 border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-orange/50"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="rounded accent-neon-orange"
                    />
                    <span className="text-sm text-text-secondary">Featured Product</span>
                  </label>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="text-sm font-semibold mb-3">Pricing</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Monthly ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.monthly_price}
                      onChange={(e) => setForm({ ...form, monthly_price: e.target.value })}
                      className="w-full bg-white/5 border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-orange/50"
                      placeholder="49.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Yearly ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.yearly_price}
                      onChange={(e) => setForm({ ...form, yearly_price: e.target.value })}
                      className="w-full bg-white/5 border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-orange/50"
                      placeholder="348.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Lifetime ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.lifetime_price}
                      onChange={(e) => setForm({ ...form, lifetime_price: e.target.value })}
                      className="w-full bg-white/5 border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-neon-orange/50"
                      placeholder="997.00"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-lg glass glass-hover text-sm font-medium text-text-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !form.name || !form.slug}
                  className="gradient-bg rounded-lg px-5 py-2.5 text-sm font-semibold text-white btn-glow transition-all hover:scale-105 disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {editing ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products table */}
      {loading ? (
        <div className="text-text-muted text-center py-12">Loading...</div>
      ) : products.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <Package className="w-12 h-12 text-text-muted/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Products</h3>
          <p className="text-text-muted text-sm">
            Create your first product to get started.
          </p>
        </div>
      ) : (
        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-6 text-text-muted font-medium">Product</th>
                <th className="text-left py-4 px-6 text-text-muted font-medium">Type</th>
                <th className="text-left py-4 px-6 text-text-muted font-medium">Platform</th>
                <th className="text-left py-4 px-6 text-text-muted font-medium">Status</th>
                <th className="text-right py-4 px-6 text-text-muted font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border last:border-0">
                  <td className="py-4 px-6">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-text-muted">{product.slug}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-white/5">
                      {product.type === "indicator" ? "Indicator" : "Algorithm"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-text-secondary capitalize">
                    {product.platform === "both" ? "All" : product.platform}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        product.status === "active"
                          ? "bg-green-500/10 text-green-400"
                          : product.status === "draft"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(product)}
                        className="p-2 rounded-lg hover:bg-white/5 text-text-muted hover:text-white transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
