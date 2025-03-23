// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { localePrefix, defaultLocale } from '../navigation';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define locales directly to avoid import issues
const locales = ['en', 'fr', 'kr'];

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  localePrefix,
  defaultLocale
});

// Export a custom middleware function that first checks for root path
export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if the path already has a locale prefix
  const pathnameHasLocale = locales.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  
  // If the path doesn't have a locale prefix, redirect to add one
  if (!pathnameHasLocale && !pathname.startsWith('/_next') && !pathname.startsWith('/api')) {
    console.log("Middleware redirecting non-localized path:", pathname);
    
    // Get the preferred locale from the Accept-Language header
    const acceptLanguage = request.headers.get('accept-language') || '';
    const preferredLocale = getPreferredLocale(acceptLanguage, locales, defaultLocale);
    
    // Create a new URL object based on the current request
    const newUrl = new URL(request.url);
    
    // Set the pathname with the locale prefix
    // If the path is just '/', we only need to add the locale
    // Otherwise, we need to add the locale before the existing path
    if (pathname === '/') {
      newUrl.pathname = `/${preferredLocale}`;
    } else {
      console.log("Preserving path when adding locale");
      // For other paths, preserve the path after adding the locale
      newUrl.pathname = `/${preferredLocale}${pathname}`;
    }
    
    // Return the redirect response
    return NextResponse.redirect(newUrl);
  }
  
  // For all other routes, use the next-intl middleware
  return intlMiddleware(request);
}

// Helper function to get the preferred locale from Accept-Language header
function getPreferredLocale(
  acceptLanguage: string,
  availableLocales: string[],
  fallback: string
): string {
  // Parse the Accept-Language header
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, priority = '1.0'] = lang.trim().split(';q=');
      return { code: code.split('-')[0], priority: parseFloat(priority) };
    })
    .sort((a, b) => b.priority - a.priority);

  // Find the first language that matches our available locales
  for (const lang of languages) {
    const matchedLocale = availableLocales.find(locale => 
      locale.toLowerCase() === lang.code.toLowerCase()
    );
    if (matchedLocale) return matchedLocale;
  }

  // If no match, return the fallback locale
  return fallback;
}

// Only applies this middleware to files in the app directory
export const config = {
  matcher: [
    // Match all paths not starting with api, _next, or containing a dot (files)
    '/((?!api|_next|.*\\..*).*)',
    // Match the root path
    '/',
    // Match all locale-prefixed paths
    '/(en|fr|kr)/:path*'
  ]
};