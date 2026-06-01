import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://domen.ru';

export default function sitemap(): MetadataRoute.Sitemap {
  // Базовая генерация для главной страницы
  const alternates = routing.locales.reduce((acc, locale) => {
    const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
    acc[locale] = `${BASE_URL}${prefix}`;
    return acc;
  }, {} as Record<string, string>);

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
      alternates: {
        languages: alternates,
      },
    },
    // В будущем тут можно циклом добавлять ссылки на посты: /@username/post/ID
  ];
}

