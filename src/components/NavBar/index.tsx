'use client';

import dynamic from 'next/dynamic';
import styles from './nav.module.scss';

const MenuNav = dynamic(() => import('./MenuNav'));
const LentaNav = dynamic(() => import('./LentaNav'));
const SearchNav = dynamic(() => import('./SearchNav'));

export default function Navbar() {

  return (
    <footer className={`p-fixed w-full z-10 ${styles.animation_footer}`}>
      <nav className={`flex justify-center align-center gap-5 p-events-none`}>
        <MenuNav />
        <LentaNav />
        <SearchNav />
      </nav>
    </footer>
  );
}