// components/Layout.tsx
"use client";
import Navbar from "@/app/[locale]/components/Navbar";
import Sidebar from "@/app/[locale]/components/Sidebar";
import { usePathname } from "~/navigation";
import { useState, useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Check if the current path is an auth page or admin page
  const isAuthPage = pathname.includes("/login") || pathname.includes("/register");
  const isAdminPage = pathname.includes("/admin");

  // Function to handle sidebar collapse state changes
  const handleSidebarCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  // Don't show sidebar and navbar for auth pages and admin pages
  if (isAuthPage || isAdminPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar onCollapseChange={handleSidebarCollapse} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-24' : 'ml-64'}`}>
        <Navbar />
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}