// src/app/manifest.ts
import {MetadataRoute} from 'next';
import {getTranslations} from 'next-intl/server';
 
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  // Pick a locale that is representative of the app
  const locale = 'ru';
 
  const t = await getTranslations({
    namespace: 'Global',
    locale
  });
 

  return {
    name: t('SiteName'),
    short_name: t('SiteName'),
    description: t('SiteDescription'),
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
    ],
  };

}