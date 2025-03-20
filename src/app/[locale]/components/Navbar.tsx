// components/Navbar.tsx
"use client";
import { signOut } from "firebase/auth";
import { auth } from "@/app/[locale]/lib/firebase";
import { useRouter } from "~/navigation";
import { Button } from "@/app/[locale]/components/ui/button";
import { Toaster } from "@/app/[locale]/components/ui/sonner";
import { toast } from "sonner"; 
import LanguageSwitcher from "@/app/[locale]/components/LanguageSwitcher";
import { useTranslations } from 'next-intl';

export default function Navbar() {
  const router = useRouter();
  const t = useTranslations('navigation');

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out", {
      description: "You have been successfully logged out."
    });
    router.push("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white py-3 px-5 flex justify-between items-center shadow-lg backdrop-blur-sm border-b border-white/10">
      <Toaster />
      <div className="flex items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          MVP Dashboard
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className=" backdrop-blur-sm rounded-lg">
          <LanguageSwitcher />
        </div>
        <Button 
          onClick={handleLogout}
          className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 border-0 shadow-md transition-all duration-200 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {t('logout')}
        </Button>
      </div>
    </nav>
  );
}