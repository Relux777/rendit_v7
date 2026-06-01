'use client';

import dynamic from 'next/dynamic';
import styles from './nav.module.scss';

const MenuNav = dynamic(() => import('./MenuNav'));
const LentaNav = dynamic(() => import('./LentaNav'));
const SearchNav = dynamic(() => import('./SearchNav'));

export default function Navbar() {

  return (
    <nav className={`p-fixed flex justify-center align-center w-full gap-5 z-10 p-events-none ${styles.animation_nav}`}>
      <MenuNav />
      <LentaNav />
      <SearchNav />
    </nav>
  );
}