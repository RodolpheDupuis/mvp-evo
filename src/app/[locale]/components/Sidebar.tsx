'use client';

// components/Sidebar.tsx
import { Link } from "~/navigation";
import { useLocale } from 'next-intl';
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar({ onCollapseChange }: { onCollapseChange?: (collapsed: boolean) => void }) {
  const locale = useLocale();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Notify parent component when collapse state changes
  useEffect(() => {
    if (onCollapseChange) {
      onCollapseChange(isCollapsed);
    }
  }, [isCollapsed, onCollapseChange]);

  // Function to create localized href
  const getLocalizedHref = (path: string) => {
    return `/${locale}${path}`;
  };
  
  // Function to check if a link is active
  const isLinkActive = (path: string) => {
    const localizedPath = getLocalizedHref(path);
    return pathname === localizedPath || pathname.startsWith(localizedPath + '/');
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

  const toggleSidebar = () => {
    setIsAnimating(true);
    setIsCollapsed(!isCollapsed);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300); // Match this with the duration-300 in the transition
  };
  
  return (
    <aside 
      className={`bg-gradient-to-br from-indigo-950 to-slate-900 text-white h-screen shadow-xl flex flex-col transition-all duration-300 ease-in-out fixed top-0 left-0 z-10 ${isCollapsed ? 'w-24' : 'w-64'}`}
    >
      <div className={`flex items-center justify-between p-5 ${isCollapsed ? 'px-3 py-5' : 'px-3 py-5'}`}>
        <h1 
          className={`font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent transition-all duration-300 ${isCollapsed ? 'text-3xl' : 'text-3xl'}`}
        >
          {isCollapsed || (isAnimating && !isCollapsed) ? "ME" : "MVP EVO"}
        </h1>
        <button 
          onClick={toggleSidebar} 
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg 
            className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      <div className="backdrop-blur-sm mb-6 px-3">
        <ul className="space-y-2.5">
          <li>
            <Link 
              href={getLocalizedHref('/home')} 
              className={`flex items-center py-2.5 rounded-lg transition-all duration-200 group ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${isLinkActive('/home') ? 'bg-white/10' : 'hover:bg-white/10'}`}
            >
              <svg className={`w-5 h-5 text-blue-400 group-hover:text-blue-300 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'} ${isLinkActive('/home') ? 'text-blue-300' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className={`transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'} ${isLinkActive('/home') ? 'font-medium' : ''}`}>Home</span>
            </Link>
          </li>
          <li>
            <Link 
              href={getLocalizedHref('/settings')} 
              className={`flex items-center py-2.5 rounded-lg transition-all duration-200 group ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${isLinkActive('/settings') ? 'bg-white/10' : 'hover:bg-white/10'}`}
            >
              <svg className={`w-5 h-5 text-blue-400 group-hover:text-blue-300 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'} ${isLinkActive('/settings') ? 'text-blue-300' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className={`transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'} ${isLinkActive('/settings') ? 'font-medium' : ''}`}>Settings</span>
            </Link>
          </li>
          <li>
            <Link 
              href={getLocalizedHref('/profile')} 
              className={`flex items-center py-2.5 rounded-lg transition-all duration-200 group ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${isLinkActive('/profile') ? 'bg-white/10' : 'hover:bg-white/10'}`}
            >
              <svg className={`w-5 h-5 text-blue-400 group-hover:text-blue-300 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'} ${isLinkActive('/profile') ? 'text-blue-300' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className={`transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'} ${isLinkActive('/profile') ? 'font-medium' : ''}`}>Profile</span>
            </Link>
          </li>
          <li>
            <Link 
              href={getLocalizedHref('/ui-showcase')} 
              className={`flex items-center py-2.5 rounded-lg transition-all duration-200 group ${isCollapsed ? 'justify-center px-0' : 'px-3'} ${isLinkActive('/ui-showcase') ? 'bg-white/10' : 'hover:bg-white/10'}`}
            >
              <svg className={`w-5 h-5 text-blue-400 group-hover:text-blue-300 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'} ${isLinkActive('/ui-showcase') ? 'text-blue-300' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              <span className={`transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'} ${isLinkActive('/ui-showcase') ? 'font-medium' : ''}`}>UI Showcase</span>
            </Link>
          </li>
        </ul>
      </div>
      
      <div className={`mt-auto px-3 pb-5 ${isCollapsed ? 'px-2' : ''}`}>
        <button 
          onClick={sendTestEmail}
          className={`flex items-center justify-center py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-200 shadow-md ${isCollapsed ? 'w-12 h-12 mx-auto p-0' : 'w-full px-4'}`}
        >
          <svg className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? '' : 'mr-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className={`transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>Send Test Email</span>
        </button>
      </div>
    </aside>
  );
}