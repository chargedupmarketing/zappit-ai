"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Shield,
  Zap,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch("/api/admin/auth/verify");
      if (res.ok) {
        setAuthenticated(true);
      } else {
        router.push("/admin/login");
      }
    } catch {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Shield className="w-8 h-8 text-neon-orange animate-pulse" />
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen grid-bg">
      <aside className="fixed left-0 top-0 h-screen w-64 glass border-r border-border p-6 flex flex-col z-40">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-glow">Zappit AI</span>
            <div className="text-xs text-neon-orange font-medium flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Admin
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "gradient-bg text-white"
                    : "text-text-secondary hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border pt-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-red-400 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="ml-64 p-8">{children}</main>
    </div>
  );
}
