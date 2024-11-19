import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-background py-6 text-foreground">
      <div className="container mx-auto text-center text-muted">
        <p className="flex items-center justify-center gap-x-2.5">
          &copy;<span>{currentYear}</span>
          <a href="https://roomofcode.com" target="_blank" rel="noopener noreferrer">
            <img
              src="/logo-roomofcode.svg"
              alt="logo Room Of Code"
              width="120"
              className="inline"
            />
          </a>
        </p>
        <div className="flex justify-center space-x-6">
          <Link href="/polityka-prywatnosci" className="transition hover:text-foreground">
            Polityka prywatności
          </Link>
          <Link href="/regulamin" className="transition hover:text-foreground">
            Regulamin
          </Link>
        </div>
      </div>
    </footer>
  )
}
