import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

interface ImageWithButtonProps {
  alt: string
  buttonLabel: string
  imageSrc: string
  title?: string
  linkUrl: string
}

const ImageWithButton: React.FC<ImageWithButtonProps> = ({
  alt,
  title,
  buttonLabel,
  imageSrc,
  linkUrl,
}) => {
  return (
    <div className="relative my-16 flex h-[60vh] w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className="h-full w-full"
          priority={true}
        />
      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold text-white md:text-6xl">{title}</h1>

        <Link href={linkUrl} passHref>
          <Button className="p-6 text-lg">{buttonLabel}</Button>
        </Link>
      </div>

      <div className="z-5 absolute inset-0 bg-black opacity-40"></div>
    </div>
  )
}

export default ImageWithButton
