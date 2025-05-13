import Link from "next/link";


export function ButtonNav ({children, href="/"}: {children: React.ReactNode , href?: string}) {
  return (
    <Link href={href} className="flex justify-center items-center p-2 cursor-pointer border-b-2 border-transparent hover:border-[var(--color-foreground)] hover:scale-110 transition-all duration-200 ease-in-out">
      {/* <button className=""> */}
          {children}
      {/* </button> */}
    </Link>

  );
}

export function ButtonMain ({
  children, 
  size="text-md", 
  black=true 
}:{
  children: React.ReactNode, 
  size?: string
  black?: boolean
}) {
  const color = black 
    ? "text-[var(--color-foreground)] hover:text-[var(--color-background)] hover:bg-[var(--color-foreground)]" 
    : "text-[var(--color-background)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-background)]";

  return (
    <button className={`py-2 px-4 cursor-pointer ${size} border-2 rounded-3xl font-bold ${color}`}>
      {children}
    </button>
  );
}

export function ButtonMainBlack ({children, size="text-md" }: {children: React.ReactNode, size?: string}) {
  return (
    <button className={`py-2 px-4 cursor-pointer ${size} border-2 rounded-3xl font-bold hover:text-[var(--color-foreground)] hover:bg-[var(--color-background)]`}>
      {children}
    </button>
  );
}