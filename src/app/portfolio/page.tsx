"use client";

import { redirect } from "next/navigation";


export default function PortafolioPage() {
  redirect("/");

  return (
    <div className="bg-[var(--color-foreground)] text-[var(--color-background)] flex flex-col items-center h-screen justify-center gap-2">
    </div>
  );
}