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
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <Toaster />
      <h1 className="text-xl font-bold">MVP Dashboard</h1>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <Button variant="destructive" onClick={handleLogout}>
          {t('logout')}
        </Button>
      </div>
    </nav>
  );
}