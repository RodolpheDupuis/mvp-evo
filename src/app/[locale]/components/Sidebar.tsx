'use client';

// components/Sidebar.tsx
import { Link } from "~/navigation";
import { useLocale } from 'next-intl';
import { Card } from "@/app/[locale]/components/ui/card";

export default function Sidebar() {
  const locale = useLocale();
  
  // Function to create localized href
  const getLocalizedHref = (path: string) => {
    return `/${locale}${path}`;
  };
  
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-6">
      <Card className="p-4 mb-4 bg-gray-800">
        <h2 className="text-lg font-semibold">Navigation</h2>
      </Card>
      <ul className="space-y-4">
        <li>
          <Link href={getLocalizedHref('/home')} className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Home</Link>
        </li>
        <li>
          <Link href={getLocalizedHref('/settings')} className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Settings</Link>
        </li>
        <li>
          <Link href={getLocalizedHref('/profile')} className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Profile</Link>
        </li>
      </ul>
    </aside>
  );
}