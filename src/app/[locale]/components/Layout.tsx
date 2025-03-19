// components/Layout.tsx
"use client";
import Navbar from "@/app/[locale]/components/Navbar";
import Sidebar from "@/app/[locale]/components/Sidebar";
import { usePathname } from "~/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname?.startsWith("/(auth)");

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