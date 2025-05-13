export default function Footer() {
  return (
    <footer>
      <div className="bg-[var(--color-background)] text-[var(--color-foreground)] flex flex-col md:flex-row justify-center items-center gap-5 p-5">
        <p className="text-xl text-center">© 2025 Exponte. <a 
          href="https://juanpamarquez.github.io/portfolio/" 
          target="_blank"
          className="text-xl hover:underline">
            Todos los derechos reservados.
          </a>
        </p>
        <a href="https://www.linkedin.com/in/juanp-marquez/" className="text-xl hover:underline" target="_blank">Linkedin</a>
        <a href="" className="text-xl hover:underline" target="_blank">Terminos y condiciones</a> 
      </div>
    </footer>
  )
}