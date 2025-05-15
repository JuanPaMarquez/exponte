import Link from "next/link";

export function ButtonNav ({children, href="/"}: {children: React.ReactNode , href?: string}) {
  return (
    <Link href={href} prefetch={true} className="flex justify-center items-center p-2 cursor-pointer border-b-2 border-transparent hover:border-[var(--color-foreground)] hover:scale-110 transition-all duration-200 ease-in-out">
      {children}
    </Link>

  );
}

export function ButtonMain ({
  children, 
  size="text-md", 
  black=true,
  href=""
}:{
  children: React.ReactNode, 
  size?: string,
  black?: boolean,
  href?: string
}) {
  const color = black 
    ? "text-[var(--color-foreground)] hover:text-[var(--color-background)] hover:bg-[var(--color-foreground)]" 
    : "text-[var(--color-background)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-background)]";

  return (
    <Link href={href} className={`flex justify-center items-center py-2 px-4 cursor-pointer ${size} border-2 rounded-3xl font-bold ${color}`}>
      {children}
    </Link>
  );
}

export function ButtonMainBlack ({
  children, 
  onClick,
  size="text-md",
  black=true,
}: {
  children: React.ReactNode, 
  onClick?: () => void,
  size?: string
  black?: boolean,
}) {
  const color = black 
    ? "text-[var(--color-foreground)] hover:text-[var(--color-background)] hover:bg-[var(--color-foreground)]" 
    : "text-[var(--color-background)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-background)]";

  return (
    <button
      onClick={onClick} 
      className={`flex justify-center items-center py-2 px-4 cursor-pointer ${size} border-2 rounded-3xl font-bold ${color}`}
    >
      {children}
    </button>
  );
}

export function ButtonLogin ({ 
  children, 
  onClick,
  type='button',
  black=true,
}:{ 
  children: React.ReactNode, 
  onClick?: () => void,
  type?: "button" | "submit" | "reset", 
  black?: boolean,
}) {

  const color = black 
    ? "bg-[var(--color-background)] text-[var(--color-foreground)] hover:bg-[#2A2A2A]" 
    : "bg-[var(--color-foreground)] text-[var(--color-background)] hover:bg-[#E3E3E3]";

  return (
    <button 
      type={type} 
      onClick={onClick}
      className={`w-60 h-9 border-1 rounded-2xl cursor-pointer ${color}`}
    >
      {children}
    </button>
  ) 
}