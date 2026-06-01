import { Link, usePathname } from '@/i18n/navigation';

import styles from './nav.module.scss'

import SearchIcon from '@/assets/svg/search-alt.svg';
import { useTranslations } from 'next-intl';

export default function SearchNav() {
    const pathname = usePathname(); 
    const isSearchPage = pathname.startsWith('/search');
    const t = useTranslations('SearchPage');

    return (
        <ul className={`flex nowrap overflow-hidden br-36 shadow-1 blur-7 tr-5 p-events-all ${styles.nav} ${styles.search} ${isSearchPage ? styles.active : ''}`}>
            <li>
                <Link className={`flex column align-center justify-center ${styles.link} ${isSearchPage ? styles.active_hide : ''}`} href="/search">
                    <SearchIcon width={24} height={24} />
                </Link>
            </li>
            <li className='flex-1'>
                <input className='font-14 pd-15' placeholder={t('search')} type="text" name="RenDitSearch" />
            </li>
        </ul>
    )
}