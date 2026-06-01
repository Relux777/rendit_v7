import SearchHeader from "@/components/Header/SearchHeader";

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <SearchHeader />
        <main>
            <div className={`container mt-20`}>
                {children}
            </div>
        </main>
        </>
    )
}