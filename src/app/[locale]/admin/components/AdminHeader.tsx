"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/app/[locale]/components/ui/button";
import { ThemeToggle } from "@/app/[locale]/components/ThemeToggle";
import { User } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/[locale]/components/ui/avatar";

interface AdminHeaderProps {
  user: User | null;
  onLogout: () => void;
}

export function AdminHeader({ user, onLogout }: AdminHeaderProps) {
  const t = useTranslations("admin");

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.displayName) {
      return "AD"; // Default Admin
    }
    return user.displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </div>
        <h1 className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-2xl font-bold text-transparent">
          {t("adminDashboard")}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "Admin"} />
              <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">{user.displayName || t("admin")}</p>
              <p className="text-xs text-white/70">{user.email}</p>
            </div>
          </div>
        )}
        <ThemeToggle />
        <Button
          onClick={onLogout}
          variant="destructive"
          className="flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {t("logout")}
        </Button>
      </div>
    </div>
  );
}
