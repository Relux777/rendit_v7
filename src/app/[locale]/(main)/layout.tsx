import LentaHeader from "@/components/Header/HomeHeader";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <LentaHeader />
        <main>
            <div className={`container mt-20`}>
                {children}
            </div>
        </main>
        </>
    )
}