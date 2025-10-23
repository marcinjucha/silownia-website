import Link from "next/link"
import Image from "next/image"

export default function HomeHeader() {
  return (
    <header className="relative [aspect-ratio:16/9] w-full overflow-hidden md:[aspect-ratio:auto] md:h-screen">
      <h1 className="text-background absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-2xl">
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
        className="pointer-events-none absolute h-full w-full object-cover"
        autoPlay
        playsInline
        webkit-playsinline="true"
        controls={false}
        preload="auto"
        muted
        loop
        aria-label="Promocyjny film z siłowni"
        // poster="/sp9.jpg"
      >
        <source src="/Progressgym.mp4" type="video/mp4" />
      </video>
    </header>
  )
}
