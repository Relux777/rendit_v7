import { ThemeProvider } from "@/providers/ThemeProvider";
import dynamic from 'next/dynamic'
import type { Viewport } from 'next';

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { getTranslations } from 'next-intl/server';
import { SITE_CONFIG } from '@/config/site';

import "@/assets/scss/ReluxCode.scss";

const NavBar = dynamic(() => import('@/components/NavBar/'))
const BackgroundDecor = dynamic(() => import('@/components/Default/BackgroundDecor'))

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,      
  userScalable: false,
  viewportFit: 'cover',      
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  const t = await getTranslations({ locale, namespace: 'Global' });

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    openGraph: {
      siteName: t('SiteName'),
      type: 'website',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
            <div className='rendit_app pb-90'>
              {children}
              <NavBar />
              <BackgroundDecor />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}