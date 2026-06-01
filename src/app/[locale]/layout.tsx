import { ThemeProvider } from "@/providers/ThemeProvider";
import dynamic from 'next/dynamic'
import type { Viewport } from 'next';

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Metadata } from 'next';

import "@/assets/scss/ReluxCode.scss";

const NavBar = dynamic(() => import('@/components/NavBar/'))
const BackgroundDecor = dynamic(() => import('@/components/Default/BackgroundDecor'))

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,          // чтобы убрать масштабирование пальцами, если нужно
  userScalable: false,      // опционально
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://domen.ru'),
  openGraph: {
    siteName: 'RenDit',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
};

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