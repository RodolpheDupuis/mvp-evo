"use client";

import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('app');
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>
      <p className="text-xl mb-8">{t('description')}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {/* Sample content cards */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Feature 1</h3>
          <p>Sample feature description</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Feature 2</h3>
          <p>Sample feature description</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Feature 3</h3>
          <p>Sample feature description</p>
        </div>
      </div>
    </div>
  );
}