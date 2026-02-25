"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Don't wrap login page in admin layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return <>{children}</>;
}
