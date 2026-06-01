import { Link } from "@/i18n/navigation";

export default function LoginModal() {
    return (
        <main className="text_center pd-20">
            <header>
                <h2>Войти</h2>
            </header>
            <p>Войдите удобным вам способом</p>
            <p>при регистрации и входе вы соглашаетесь <br />
            с условиями <Link href="/" className="color-4-80">использования сайта</Link> и <Link href="/" className="color-4-80">политикой конфиденциальности</Link></p>
        </main>
    )
}