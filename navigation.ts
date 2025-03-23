'use client';

// navigation.ts
import { useRouter as useNextRouter, usePathname as useNextPathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import NextLink from 'next/link';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';

export const locales = ['en', 'fr', 'kr'];
export const localePrefix = 'as-needed';
export const defaultLocale = 'en';

// Custom router that handles locale
export function useRouter() {
  const nextRouter = useNextRouter();
  const locale = useLocale();
  
  return {
    ...nextRouter,
    push: (href: string, options?: any) => {
      // Always add locale to href, even for default locale
      const localizedHref = `/${locale}${href.startsWith('/') ? href : `/${href}`}`;
      return nextRouter.push(localizedHref, options);
    },
    replace: (href: string, options?: any) => {
      // Always add locale to href, even for default locale
      const localizedHref = `/${locale}${href.startsWith('/') ? href : `/${href}`}`;
      return nextRouter.replace(localizedHref, options);
    }
  };
}

// Custom pathname hook that removes the locale prefix
export function usePathname() {
  const pathname = useNextPathname();
  const locale = useLocale();
  
  // If the pathname starts with the locale, remove it
  if (pathname.startsWith(`/${locale}`)) {
    return pathname.substring(locale.length + 1);
  }
  
  return pathname;
}

// Re-export redirect from next/navigation
export { redirect } from 'next/navigation';

// Re-export Link from next/link for use in the app
export { default as Link } from 'next/link';