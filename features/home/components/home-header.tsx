import Link from "next/link"
import Image from "next/image"

export default function HomeHeader() {
  return (
    <header className="relative h-screen w-full overflow-hidden">
      <h1 className="absolute left-1/2 top-1/4 z-10 -translate-x-1/2 -translate-y-1/2 text-2xl text-background">
        <Link href="/">
          <Image
            src="/images/logo_zlote.svg"
            alt="Logo ProgressGym"
            width={2000}
            height={300}
            priority
          />
        </Link>
      </h1>
      <video
        className="absolute h-full w-full object-cover"
        autoPlay
        muted
        loop
        aria-label="Promocyjny film z siłowni"
      >
        <source src="/filmikprzykladowy.mov" type="video/mp4" />
      </video>
    </header>
  )
}
