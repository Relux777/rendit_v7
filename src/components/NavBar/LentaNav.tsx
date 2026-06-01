import { usePathname } from '@/i18n/navigation';

import styles from './nav.module.scss'


import LeftIcon from '@/assets/svg/caret-big-left.svg';
import PlusIcon from '@/assets/svg/plus.svg';
import RightIcon from '@/assets/svg/caret-big-right.svg';

export default function LentaNav() {
    const pathname = usePathname(); 
    const isSearchPage = pathname === '/';

    return (
        <ul className={`flex nowrap justify-evenly overflow-hidden br-36 shadow-1 blur-7 tr-5 p-events-all ${styles.nav} ${styles.lenta} ${isSearchPage ? styles.active : ''}`}>
            <li>
                <button className={`flex column align-center justify-center active_scale_09 ${styles.link}`}>
                    <LeftIcon width={24} height={24} />
                </button>
            </li>
            <li className='br-36 shadow-1 blur-7'>
                <button className={`flex column align-center justify-center active_scale_09 ${styles.link}`}>
                    <PlusIcon width={24} height={24} fill="#679efe" />
                </button>
            </li>
            <li>
                <button className={`flex column align-center justify-center active_scale_09 ${styles.link}`}>
                    <RightIcon width={24} height={24} />
                </button>
            </li>
        </ul>
    )
}