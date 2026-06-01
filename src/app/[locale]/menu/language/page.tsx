'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/navigation';
import { useTransition } from 'react';

// Список языков с их локализованными названиями
const LANGUAGES = [
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
  { code: 'kk', label: 'Қазақша' },
  { code: 'uz', label: 'Oʻzbekcha' },
  { code: 'zh', label: '中文' },
  { code: 'be', label: 'Беларуская' },
  { code: 'ky', label: 'Кыргызча' },
  { code: 'tg', label: 'Тоҷикӣ' },
  { code: 'hy', label: 'Հայերեն' },
  { code: 'az', label: 'Azərbaycanca' },
];

export default function LanguagePage() {
  
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  // Добавляем useTransition для плавной смены языка в Next.js 16
  const [isPending, startTransition] = useTransition();

const changeLanguage = (nextLocale: string) => {
    // 1. Принудительно меняем куку для middleware
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;

    // 2. Формируем URL
    const prefix = nextLocale === 'ru' ? '' : `/${nextLocale}`;
    const cleanPath = pathname === '/' ? '' : pathname;
    const newUrl = `${prefix}${cleanPath}` || '/';

    // 3. Перезагружаем
    window.location.href = newUrl;
  };

  return (
    <div className="language-container">
      <h2>Ваш язык: {LANGUAGES.find(l => l.code === currentLocale)?.label}</h2>
      
      <div className="language-grid">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            // Блокируем кнопку, если это текущий язык ИЛИ если язык сейчас меняется (isPending)
            disabled={currentLocale === lang.code || isPending}
            className={`lang-btn ${currentLocale === lang.code ? 'active' : ''}`}
          >
            {lang.label}
          </button>

          
        ))}
        <Link 
                  href="/" 
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--foreground)',
                    color: 'var(--background)',
                    borderRadius: '8px',
                    textDecoration: 'none'
                  }}
                >
                  обратно 
                </Link>
      </div>
    </div>
  );
}