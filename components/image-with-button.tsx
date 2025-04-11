import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { ImageDTO } from "@/features/common/common-dtos"

interface ImageWithButtonProps {
  buttonLabel: string
  image: ImageDTO
  title?: string
  linkUrl: string
}

const ImageWithButton: React.FC<ImageWithButtonProps> = ({
  title,
  buttonLabel,
  image,
  linkUrl,
}) => {
  return (
    <>
      <div className="relative my-16 flex h-[60vh] w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={image.url}
            alt={image.alt || "image"}
            fill
            className="h-full w-full object-cover"
            priority={true}
          />
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold text-white md:text-6xl">{title}</h1>

          <Link href={linkUrl} passHref>
            <Button className="p-6 text-lg">{buttonLabel}</Button>
          </Link>
        </div>

        <div className="absolute inset-0 z-5 bg-black opacity-40"></div>
      </div>
    </>
  )
}

export default ImageWithButton
