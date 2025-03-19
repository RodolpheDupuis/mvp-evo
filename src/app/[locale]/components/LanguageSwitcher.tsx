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
    
    // Get the path without any locale prefix
    let pathWithoutLocale = pathname;
    
    // For the root path, use '/' for all locales
    if (pathWithoutLocale === '' || pathWithoutLocale === '/') {
      const newPath = newLocale === 'en' ? '/' : `/${newLocale}`;
      console.log('Root path, new path:', newPath);
      nextRouter.replace(newPath);
      return;
    }
    
    // For non-root paths, construct the path with the new locale
    const newPath = newLocale === 'en' ? pathWithoutLocale : `/${newLocale}${pathWithoutLocale}`;
    console.log('New path:', newPath);
    nextRouter.replace(newPath);
  };

  return (
    <select value={locale} onChange={handleChange} className="p-2 rounded">
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="kr">한국어</option>
    </select>
  );
}