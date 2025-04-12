import Image from "next/image"
import Link from "next/link"
import { ImageDTO } from "@/features/common/common-dtos"
import { Button } from "@/components/ui/button"

interface Props {
  title: string
  image: ImageDTO
  linkUrl: string
}

export default function HomeOfferCard({ title, image, linkUrl }: Props) {
  return (
    <div className="group bg-primary relative flex h-80 flex-col items-center justify-center overflow-hidden rounded-lg shadow-lg">
      <Image
        src={image.url}
        alt={image.alt || "image"}
        width={image.width}
        height={image.height}
        className="h-full w-full object-cover group-hover:grayscale"
      />
      <Link href={linkUrl} passHref>
        <Button className="hover:bg-primary absolute bottom-6 left-1/2 -translate-x-1/2 transform transition-transform duration-300 ease-in-out group-hover:scale-125">
          {title}
        </Button>
      </Link>
    </div>
  )
}
