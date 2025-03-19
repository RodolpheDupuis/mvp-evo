// app/[locale]/components/LanguageSwitcher.tsx
'use client';

import { usePathname, useRouter } from '~/navigation';
import { useLocale } from 'next-intl';
import { ChangeEvent } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    // If switching to default locale (en), don't add prefix
    // Otherwise, add the locale prefix
    const newPath = newLocale === 'en' ? pathname : `/${newLocale}${pathname}`;
    router.replace(newPath);
  };

  return (
    <select value={locale} onChange={handleChange} className="p-2 rounded">
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="kr">한국어</option>
    </select>
  );
}