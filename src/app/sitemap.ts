import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

import { SITE_CONFIG } from '@/config/site';

const BASE_URL = SITE_CONFIG.url;

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

