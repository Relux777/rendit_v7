'use client';

import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import HeaderShell from "@/components/Header/HeaderDefault";

import styles from '@/components/ui/modal/modal.module.scss';
import Modal from '@/components/ui/modal';

const LoginModal = dynamic(() => import('@/components/ui/modal/content/LoginModal'));

export default function HomeHeader() {
    // Стейт для управления модальным окном
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <HeaderShell>
            <ul className='flex-1 px-10'>
                <li><h2>Лента</h2></li>
            </ul>
            <ul>
                <li>
                    {/* Кнопка открывает модальное окно */}
                    <button 
                        onClick={() => setIsModalOpen(true)} 
                        className='flex align-center hover-80 pd-3 blur-7 shadow-1 br-36 active_scale_09'
                    >
                        <Image
                            className="br-36" 
                            src="/user.jpg"
                            alt="Picture of the author"
                            width={40}
                            height={40}
                        />
                    </button>

                    {/* Передаем стейт и функцию закрытия */}
                    <Modal 
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        className={`${styles.center} ${styles.w_440px}`}
                    >
                        <LoginModal />
                    </Modal>
                    
                </li>
            </ul>
        </HeaderShell>
    )
}