"use client";

import { useState, useEffect } from "react";
import { useRouter } from "~/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { auth } from "@/app/[locale]/lib/firebase";
import { Toaster } from "@/app/[locale]/components/ui/sonner";
import { toast } from "sonner";
import { UserList } from "@/app/[locale]/admin/components/UserList";
import { AdminHeader } from "@/app/[locale]/admin/components/AdminHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/[locale]/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { Button } from "@/app/[locale]/components/ui/button";
import { onAuthStateChanged } from "firebase/auth";
import { locales, defaultLocale } from "~/navigation";

export default function AdminPage() {
  const t = useTranslations("admin");
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("users");
  const [welcomeToastShown, setWelcomeToastShown] = useState(false);

  // Helper function to ensure routes have locale
  const getLocalizedRoute = (route: string) => {
    // If route already has a locale prefix, return as is
    if (locales.some(loc => route.startsWith(`/${loc}/`))) {
      return route;
    }
    
    // Add locale prefix if needed
    return locale === defaultLocale ? route : `/${locale}${route}`;
  };

  // Check if user is authenticated and has admin privileges
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // For demo purposes, we'll consider any logged-in user as admin
        // In a real app, you would check if the user has admin role
        setUser(currentUser);
        setLoading(false);
        
        // Show welcome toast only once
        if (!welcomeToastShown) {
          toast.success(t("welcomeAdmin"), {
            description: t("adminAccessGranted"),
          });
          setWelcomeToastShown(true);
        }
      } else {
        // Redirect to login if not authenticated
        router.push(getLocalizedRoute("/login"));
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [router, t, welcomeToastShown, locale]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success(t("loggedOut"), {
        description: t("redirectingToLogin"),
      });
      router.push(getLocalizedRoute("/login"));
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error(t("logoutError"), {
        description: t("tryAgainLater"),
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg text-white/70">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      
      <AdminHeader user={user} onLogout={handleLogout} />
      
      <div className="mt-8">
        <Tabs
          defaultValue="users"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="users">{t("users")}</TabsTrigger>
            <TabsTrigger value="settings">{t("settings")}</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="users" className="space-y-4">
              <UserList />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h2 className="text-xl font-semibold">{t("adminSettings")}</h2>
                <p className="mt-2 text-white/70">{t("settingsDescription")}</p>
                
                <div className="mt-6 space-y-4">
                  <div className="rounded-md border border-white/10 bg-white/5 p-4">
                    <h3 className="font-medium">{t("databaseSettings")}</h3>
                    <p className="mt-1 text-sm text-white/70">{t("databaseDescription")}</p>
                    <Button className="mt-4" variant="outline" size="sm">
                      {t("configureDatabaseSettings")}
                    </Button>
                  </div>
                  
                  <div className="rounded-md border border-white/10 bg-white/5 p-4">
                    <h3 className="font-medium">{t("securitySettings")}</h3>
                    <p className="mt-1 text-sm text-white/70">{t("securityDescription")}</p>
                    <Button className="mt-4" variant="outline" size="sm">
                      {t("configureSecuritySettings")}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
}
