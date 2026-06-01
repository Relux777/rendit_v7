// src/app/[locale]/menu/page.tsx
import { Metadata } from 'next';
import { getHreflangLinks } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MenuPage' }); 
  
  const currentPath = '/menu'; 

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: getHreflangLinks(currentPath)[locale],
      languages: getHreflangLinks(currentPath), 
    },
  };
}

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MenuPage' });

  return (
    <main>
      <h1>Страница настроек</h1>
      <Link href="/menu/language">
        {t('changeLanguageLink')}
      </Link>
    </main>
  );
}

