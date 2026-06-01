'use client';


import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

import HeaderShell from "@/components/Header/HeaderFull";
import ChevronLeftIcon from '@/assets/svg/chevron-left.svg';

export default function SearchHeader() {
    const t = useTranslations('SearchPage');
    const router = useRouter(); 

    return (
        <HeaderShell>
            <div className="container flex justify-between align-center h-60">
                <ul className='flex justify-between align-center gap-10'>
                    <li>
                        <button 
                            onClick={() => router.back()}
                            className='flex align-center justify-center hover-80 pd-3 blur-7 shadow-1 br-36 active_scale_09 w-40 h-40'
                        >
                            <ChevronLeftIcon width={28} height={28} viewBox="0 0 24 24" />
                        </button>
                    </li>
                    <li><h2>{t('search')}</h2></li>
                </ul>
            </div>
        </HeaderShell>
    )
}