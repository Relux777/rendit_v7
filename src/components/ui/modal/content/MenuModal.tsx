//components/ui/modal/content/MenuModal
import { Link } from "@/i18n/navigation";
import Image from 'next/image';

import UserIcon from '@/assets/svg/user.svg';

export default function MenuModal() {
    return (
        <main className="p-relative overflow-auto scrollbar-none pd-20">
            <header>
                <h2 className="text_center mb-15">Меню 2</h2>
            </header>
            <div className="flex align-center gap-10 mb-20 bg-2-3 br-12 pd-10 shadow-5">
                <button className='flex align-center hover-80 pd-3 blur-7 shadow-1 br-36 active_scale_09'>
                    <Image
                                            className="br-36" 
                                            src="/user.jpg"
                                            alt="Picture of the author"
                                            width={40}
                                            height={40}
                                        />
                </button>
                <div>
                    <h3>Плотников Ренат</h3>
                    <span>Ваш ID: 1</span>
                </div>
                
            </div>
            <nav>
                <ul className='bg-2-3 br-12 pd-10 shadow-5'>
                    <li>
                        <Link className="pd-12 br-12 flex mb-7 gap-7 h-bg-2-5" href="/">
                            <UserIcon width={22} height={22} fill="#679efe" viewBox="0 0 24 24" />
                            <span>Мой профиль</span>
                        </Link>
                        <Link className="pd-12 br-12 flex mb-7 gap-7 h-bg-2-5" href="/">
                            <UserIcon width={22} height={22} fill="#ff74d9" viewBox="0 0 24 24" />
                            <span>Внешний вид</span>
                        </Link>
                        <Link className="pd-12 br-12 flex mb-7 gap-7 h-bg-2-5" href="/">
                            <UserIcon width={22} height={22} fill="#cf6679" viewBox="0 0 24 24" />
                            <span>Избранное</span>
                        </Link>
                        <Link className="pd-12 br-12 flex mb-7 gap-7 h-bg-2-5" href="/">
                            <UserIcon width={22} height={22} fill="#34495e" viewBox="0 0 24 24" />
                            <span>Конфиденциальность</span>
                        </Link>
                        <Link className="pd-12 br-12 flex mb-7 gap-7 h-bg-2-5" href="/">
                            <UserIcon width={22} height={22} fill="#309054" viewBox="0 0 24 24" />
                            <span>Пользовательское соглашение</span>
                        </Link>
                        <Link className="pd-12 br-12 flex mb-7 gap-7 h-bg-2-5" href="/">
                            <UserIcon width={22} height={22} fill="#0060d1" viewBox="0 0 24 24" />
                            <span>О сервисе</span>
                        </Link>
                        <Link className="pd-12 br-12 flex gap-7 h-bg-2-5" href="/">
                            <UserIcon width={22} height={22} fill="#8f8f8f" viewBox="0 0 24 24" />
                            <span>Выйти</span>
                        </Link>
                    </li>  
                </ul>
                
            </nav>
        </main>
    )
}