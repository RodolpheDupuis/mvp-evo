'use client';

// navigation.ts
import { useRouter as useNextRouter, usePathname as useNextPathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export const locales = ['en', 'fr', 'kr'];
export const localePrefix = 'as-needed';

// Custom router that handles locale
export function useRouter() {
  const nextRouter = useNextRouter();
  const locale = useLocale();
  
  return {
    ...nextRouter,
    push: (href: string, options?: any) => {
      // Add locale to href if it's not the default locale
      const localizedHref = locale !== 'en' ? `/${locale}${href}` : href;
      return nextRouter.push(localizedHref, options);
    },
    replace: (href: string, options?: any) => {
      // Add locale to href if it's not the default locale
      const localizedHref = locale !== 'en' ? `/${locale}${href}` : href;
      return nextRouter.replace(localizedHref, options);
    }
  };
}

// Custom pathname hook that removes the locale prefix
export function usePathname() {
  const pathname = useNextPathname();
  const locale = useLocale();
  
  // If the pathname starts with the locale, remove it
  if (locale !== 'en' && pathname.startsWith(`/${locale}`)) {
    return pathname.substring(locale.length + 1);
  }
  
  return pathname;
}

// Re-export redirect from next/navigation
export { redirect } from 'next/navigation';

// Export Link component
export { Link };