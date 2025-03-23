import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Admin Dashboard - MVP Evolution",
  description: "Admin dashboard for managing users and application settings",
};

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<any> | undefined;
}) {
  // Resolve params if it's a Promise
  const resolvedParams = params ? await params : { locale: 'en' };
  const locale = resolvedParams.locale;
  
  // Pass the namespace directly as a string
  const t = await getTranslations('admin');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}
