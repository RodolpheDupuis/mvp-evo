import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// Configure internationalization
const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
