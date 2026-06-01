import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import styles from './header.module.scss'
import LogoIcon from '@/assets/svg/filled/heart.svg';

export default function HeaderDefault({ children }: { children: React.ReactNode }) {
    const t = useTranslations('Header');

        return (
            <header className={`p-sticky t-0 z-20 ${styles.header}`}>
                <div className="container flex justify-between align-center h-60">
                    <Link href="/" className='flex align-center gap-5 hover-80'>
                        <LogoIcon width={30} height={30} fill="#e5484d" viewBox="0 0 24 24" />
                        <h2 className='m-none font-24' style={{color: '#e5484d'}}>{t('SiteName')}</h2>
                    </Link>
                    {children}
                </div>
            </header>
        )
}