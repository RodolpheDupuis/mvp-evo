// app/[locale]/components/LanguageSwitcher.tsx
'use client';

import { usePathname } from '~/navigation';
import { useRouter as useNextRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ChangeEvent } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const nextRouter = useNextRouter();
  const pathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    
    // Check if the pathname already includes the locale
    const hasLocalePrefix = new RegExp(`^\\/(${locale})\\/`).test(pathname) || pathname === `/${locale}`;
    
    let pathWithoutLocale;
    if (hasLocalePrefix) {
      // If the pathname includes the locale, remove it
      pathWithoutLocale = pathname.replace(new RegExp(`^\\/${locale}`), '');
    } else {
      // If the pathname doesn't include the locale, use it as is
      pathWithoutLocale = pathname;
    }
    
    // For non-root paths, construct the path with the new locale
    // If the path is empty after removing locale, use '/'
    const newPath = pathWithoutLocale ? `/${newLocale}${pathWithoutLocale}` : `/${newLocale}`;
    
    nextRouter.replace(newPath);
  };

  return (
    <div className="relative flex items-center group">
      <svg 
        className="w-4 h-4 absolute left-2.5 text-blue-400 pointer-events-none z-10" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <select 
        value={locale} 
        onChange={handleChange} 
        className="appearance-none bg-white/10 backdrop-blur-sm text-sm pl-9 pr-8 py-2 rounded-lg border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:bg-white/15 transition-all duration-200 dark-dropdown"
        style={{
          // This ensures dropdown options have proper styling
          background: 'rgba(30, 41, 59, 0.8)',
          color: 'white'
        }}
      >
        <option value="en" className="bg-slate-800 text-white py-2">English</option>
        <option value="fr" className="bg-slate-800 text-white py-2">Français</option>
        <option value="kr" className="bg-slate-800 text-white py-2">한국어</option>
      </select>
      <svg 
        className="w-4 h-4 absolute right-2.5 text-blue-400 pointer-events-none transition-transform duration-200 group-hover:text-blue-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M19 9l-7 7-7-7" 
        />
      </svg>
      
      {/* Add global styles for dropdown options */}
      <style jsx global>{`
        /* Style the dropdown options */
        .dark-dropdown option {
          background-color: #1e293b;
          color: white;
          padding: 8px 12px;
        }
        
        /* Style for when option is hovered/focused */
        .dark-dropdown option:hover,
        .dark-dropdown option:focus,
        .dark-dropdown option:active,
        .dark-dropdown option:checked {
          background-color: #334155;
        }
      `}</style>
    </div>
  );
}