import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-background text-foreground py-6">
      <div className="text-muted container mx-auto text-center">
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
          <Link href="/polityka-prywatnosci" className="hover:text-foreground transition">
            Polityka prywatności
          </Link>
          <Link href="/regulamin" className="hover:text-foreground transition">
            Regulamin
          </Link>
        </div>
      </div>
    </footer>
  )
}
