export function ButtonNav ({children}: {children: React.ReactNode}) {
  return (
    <button className="p-2 cursor-pointer border-b-2 border-transparent hover:border-[var(--color-foreground)] hover:scale-110 transition-all duration-200 ease-in-out">
      {children}
    </button>
  );
}