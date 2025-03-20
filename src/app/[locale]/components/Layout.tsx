// components/Layout.tsx
"use client";
import Navbar from "@/app/[locale]/components/Navbar";
import Sidebar from "@/app/[locale]/components/Sidebar";
import { usePathname } from "~/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if the current path is an auth page
  const isAuthPage = pathname.includes("/login") || pathname.includes("/register");

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}