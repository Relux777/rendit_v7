import { Link, usePathname } from '@/i18n/navigation';

import styles from './nav.module.scss';

import HomeIcon from '@/assets/svg/home.svg';
import FireAltIcon from '@/assets/svg/fire-alt.svg';
import MessageCircleIcon from '@/assets/svg/message-circle.svg';
import MenuIcon from '@/assets/svg/menu.svg';
import { useTranslations } from 'next-intl';

export default function MenuNav() {
    const t = useTranslations('Menu');
    const pathname = usePathname(); 
    const isSearchPage = pathname.startsWith('/lenta') || pathname.startsWith('/search') ;

    const NavBarLink = [
        { href: '/', icon: HomeIcon, label: t('home') },
        { href: '/lenta/15', icon: FireAltIcon, label: t('feed') },
        { href: '/notifications', icon: MessageCircleIcon, label: t('chats') },
        { href: '/menu', icon: MenuIcon, label: t('menu') },
    ];

    return (
        <ul className={`flex nowrap overflow-hidden p-relative br-36 shadow-1 blur-7 p-events-all ${styles.nav} ${styles.menu} ${isSearchPage ? styles.active : ''}`}>
            {NavBarLink.map((link) => {
                const Icon = link.icon;
                const isActive = link.href === '/' ? pathname === link.href : pathname.startsWith(link.href);

                return (
                    <li key={link.href}>
                        <Link 
                            className={`flex column align-center justify-center p-relative z-10 gap-3  active_scale_09 ${styles.link} ${isActive ? styles.active : ''}`} 
                            href={link.href}
                        >
                            <Icon className={styles.nav_icon} width={24} height={24} />
                            <span className={`block`}>{link.label}</span>
                        </Link>
                    </li>
                )               
            })}
            <div className={`${styles.slider} p-absolute t-0 l-0 br-36 shadow-2 bg-2-10 visible tr-bezier-5`}></div>
        </ul>
    );
}