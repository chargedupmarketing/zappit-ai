"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Package,
  FileText,
  LogOut,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/subscriptions", label: "Subscriptions", icon: CreditCard },
  { href: "/dashboard/products", label: "My Products", icon: Package },
  { href: "/dashboard/billing", label: "Billing", icon: FileText },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Zap className="w-8 h-8 text-neon-orange animate-pulse" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen grid-bg">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 glass border-r border-border p-6 flex flex-col z-40">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-glow">Zappit AI</span>
        </Link>

        {/* Back to site */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Site
        </Link>

        {/* Navigation */}
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

        {/* User info & logout */}
        <div className="border-t border-border pt-4">
          <div className="text-sm text-text-secondary mb-3 truncate">
            {user.email}
          </div>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-red-400 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">{children}</main>
    </div>
  );
}
