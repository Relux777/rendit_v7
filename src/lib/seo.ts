// src/lib/seo.ts
import { routing } from '@/i18n/routing';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://domen.ru';

export function getHreflangLinks(cleanPath: string): Record<string, string> {
  const languages: Record<string, string> = {};

  // Очищаем переданный путь от начальных и конечных слэшей для безопасной склейки
  const sanitizedPath = cleanPath.replace(/^\/|\/$/g, '');
  // Если путь не пустой, добавляем к нему один передний слэш
  const pathSegment = sanitizedPath ? `/${sanitizedPath}` : '';

  routing.locales.forEach((loc) => {
    // Для дефолтного языка (ru) префикс пустой '', для остальных — '/en', '/kk' и т.д.
    const prefix = loc === routing.defaultLocale ? '' : `/${loc}`;
    
    // Результат: https://domen.ru/en/menu или https://domen.ru/menu
    languages[loc] = `${BASE_URL}${prefix}${pathSegment}`;
  });

  // Поисковики требуют указания x-default для пользователей без предпочтений
  languages['x-default'] = languages[routing.defaultLocale];

  return languages;
}

// Универсальный генератор микроразметки (добавим динамический тип для гибкости)
export function generateJsonLd(locale: string, type: 'WebSite' | 'Article' = 'WebSite', customData = {}) {
  const langPrefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': type,
    ...customData,
    url: `${BASE_URL}${langPrefix}`,
  };
}