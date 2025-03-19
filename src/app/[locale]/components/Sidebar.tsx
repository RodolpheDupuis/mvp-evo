'use client';

// components/Sidebar.tsx
import { Link } from "~/navigation";
import { useLocale } from 'next-intl';
import { Card } from "@/app/[locale]/components/ui/card";
import { toast } from "sonner";

export default function Sidebar() {
  const locale = useLocale();
  
  // Function to create localized href
  const getLocalizedHref = (path: string) => {
    return `/${locale}${path}`;
  };
  
  // Function to send a test email
  const sendTestEmail = async () => {
    try {
      toast.info("Sending test email...");
      
      const response = await fetch(`/${locale}/api/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'welcome',
          email: 'rodolphe.dupuis02@gmail.com',
          name: 'Rodolphe',
          locale
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Test email sent successfully!");
      } else {
        toast.error(`Failed to send email: ${result.error}`);
      }
    } catch (error) {
      console.error('Error sending test email:', error);
      toast.error(`Error sending email: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
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
        <li>
          <button 
            onClick={sendTestEmail}
            className="w-full text-left px-4 py-2 bg-indigo-700 rounded hover:bg-indigo-600 flex items-center"
          >
            <span className="mr-2">✉️</span> Send Test Email
          </button>
        </li>
      </ul>
    </aside>
  );
}