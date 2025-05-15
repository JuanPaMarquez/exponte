import { ButtonMain } from "@/components/Buttons";
import Link from "next/link";

export default function LayoutDashboard({ children }:{ children: React.ReactNode }) {
  return (
    <main className="bg-[var(--color-foreground)] text-[var(--color-background)] h-screen">
      <nav className="bg-[var(--color-background)] text-[var(--color-foreground)] p-1 flex justify-between items-center gap-3">
        <Link href={"/"} className="titulo hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer">
          EXPONTE
        </Link>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ButtonMain>
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
        </ButtonMain>
      </nav>
      {children}
    </main>
  )
}