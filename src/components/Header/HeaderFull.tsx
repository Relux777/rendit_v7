import styles from './header.module.scss'

export default function HeaderFull({ children }: { children: React.ReactNode }) {
        return (
            <header className={`p-sticky t-0 z-10 ${styles.header}`}>
                {children}
            </header>
        )
}