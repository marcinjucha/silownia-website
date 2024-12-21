import Image from "next/image"
import { Button } from "@/components/ui/button"

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
        <p className="text-lg leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut vero aut provident error,
          earum harum numquam labore accusamus officiis ex! Ab architecto necessitatibus id illo
          obcaecati alias reprehenderit quod, repellendus aut possimus repudiandae magnam eum nisi
          rerum tempora similique aperiam soluta aliquam eos unde consequuntur laudantium, quasi
          nesciunt
        </p>
        <p>
          już dzisiaj. Dołącz do nas i ciesz się wszystkimi korzyściami, które daje Ci nasz klub!
        </p>
        <Button className="my-2 font-extrabold" variant="outline">
          Kup Karnet
        </Button>
      </div>
    </section>
  )
}
