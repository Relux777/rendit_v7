import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ru', 'kk', 'uz', 'zh', 'be', 'ky', 'tg', 'en', 'hy', 'az'],
  defaultLocale: 'ru',
  localePrefix: 'as-needed'
});