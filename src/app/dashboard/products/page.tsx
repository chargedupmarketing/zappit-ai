"use client";

import { useEffect, useState } from "react";
import { Package, Download, ExternalLink } from "lucide-react";

interface PurchasedProduct {
  id: string;
  name: string;
  type: string;
  platform: string;
  billing_type: string;
  purchased_at: string;
}

export default function MyProductsPage() {
  const [products, setProducts] = useState<PurchasedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("zappit-token");
        const res = await fetch("/api/customer/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || []);
        }
      } catch {
        // Will show empty state
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Products</h1>
        <p className="text-text-secondary mt-1">
          Access your purchased indicators and algorithms.
        </p>
      </div>

      {loading ? (
        <div className="text-text-muted text-center py-12">Loading...</div>
      ) : products.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <Package className="w-12 h-12 text-text-muted/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Products Yet</h3>
          <p className="text-text-muted text-sm">
            Your purchased products will appear here.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {products.map((product) => (
            <div key={product.id} className="glass rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-medium gradient-bg text-white mb-2">
                    {product.type === "indicator" ? "Indicator" : "Algorithm"}
                  </span>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-text-muted mt-1">
                    Platform:{" "}
                    {product.platform === "both"
                      ? "TradingView & Apex"
                      : product.platform}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button className="flex-1 glass glass-hover rounded-lg py-2.5 text-sm font-medium text-text-secondary hover:text-white transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Access Product
                </button>
                <button className="glass glass-hover rounded-lg p-2.5 text-text-secondary hover:text-neon-orange transition-all">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
