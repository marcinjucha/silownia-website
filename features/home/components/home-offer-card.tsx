import { ImageDTO } from "@/features/common/dtos"
import Image from "next/image"

type Props = {
  image: ImageDTO
  buttonText: string
}

export default function HomeOfferCard({ image, buttonText }: Props) {
  return (
    <div className="relative flex h-80 flex-col items-center justify-center overflow-hidden rounded-lg bg-secondary shadow-lg">
      <Image src={image.url} alt={image.alternativeText} className="object-cover" fill />
      <button className="absolute bottom-4 rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-destructive">
        {buttonText}
      </button>
    </div>
  )
}
