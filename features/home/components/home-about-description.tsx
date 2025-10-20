import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomeAboutDescription() {
  return (
    <section className="my-8 flex flex-col items-center justify-center md:flex-row">
      <div className="relative h-64 w-full md:h-96 md:w-1/2">
        <Image
          className="rounded-lg object-cover shadow-lg"
          src="/images/zdjecieD.jpeg"
          alt="To jest obrazek przykładowy kota"
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
        />
      </div>

      <div className="flex h-auto w-full flex-col items-center justify-center p-5 text-center md:w-1/2">
        <p className="text-primary text-xl font-bold">Więcej niż siłownia</p>
        <p className="text-lg leading-relaxed">
          Progress Gym to nie tylko miejsce do ćwiczeń – to przestrzeń, w której możesz zadbać o
          zdrowie i regenerację. Do dyspozycji są przestronne szatnie, toalety przystosowane dla
          osób z niepełnosprawnościami, a także nowoczesna kawiarnia, gdzie można napić się świeżo
          parzonej kawy, świeżo wyciskanych soków i spróbować fit przekąsek, sałatek czy kanapek.
          Jeśli szukasz miejsca, które łączy najwyższej jakości sprzęt, profesjonalne warunki do
          treningu i świetną atmosferę, Progress Gym to najlepszy wybór. Dołącz do nas i trenuj na
          własnych zasadach!
        </p>

        <Button className="my-2 font-extrabold" variant="outline">
          <Link href="https://progressgymelitead-wroclaw.cms.efitness.com.pl/kalendarz-zajec?day=2025-06-03">
            Kup Karnet
          </Link>
        </Button>
      </div>
    </section>
  )
}
