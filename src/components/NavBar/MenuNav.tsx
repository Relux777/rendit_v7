import { Link, usePathname } from '@/i18n/navigation';

import styles from './nav.module.scss';

import MenuIcon from '@/assets/svg/menu.svg';
import LentaIcon from '@/assets/svg/lenta.svg';
import UserIcon from '@/assets/svg/user.svg';
import BellIcon from '@/assets/svg/bell.svg';

export default function MenuNav() {
    const pathname = usePathname(); 
    const isSearchPage = pathname.startsWith('/menu') || pathname.startsWith('/notifications') || pathname.startsWith('/r');

    const NavBarLink = [
        { href: '/menu', icon: MenuIcon },
        { href: '/', icon: LentaIcon },
        { href: '/notifications', icon: BellIcon },
        { href: '/r/relux', icon: UserIcon },
    ];

    return (
        <ul className={`flex nowrap overflow-hidden p-relative br-36 shadow-1 blur-7 tr-5 p-events-all ${styles.nav} ${styles.menu} ${isSearchPage ? styles.active : ''}`}>
            {NavBarLink.map((link) => {
                const Icon = link.icon;
                const isActive = link.href === '/' ? pathname === link.href : pathname.startsWith(link.href);

                return (
                    <li key={link.href}>
                        <Link 
                            className={`flex column align-center justify-center p-relative z-10 active_scale_09 ${styles.link} ${isActive ? styles.active : ''}`} 
                            href={link.href}
                        >
                            <Icon className={styles.nav_icon} width={24} height={24} />
                        </Link>
                    </li>
                )               
            })}
            <div className={`p-absolute t-0 l-0 br-36 shadow-2 bg-2-7 visible tr-bezier-5`}></div>
        </ul>
    );
}