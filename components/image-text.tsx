"use client"
import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ImageDTO } from "@/features/common/dtos"
import { Button } from "./ui/button"

interface Props {
  title: string
  subtitle: string
  description: string
  buttonLabel?: string
  linkUrl?: string
  image: ImageDTO
  reverse?: boolean
}

export default function ImageText({
  title,
  subtitle,
  description,
  image,
  buttonLabel,
  linkUrl,
  reverse = false,
}: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const imageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current)
      }
    }
  }, [])

  return (
    <div
      className={`container mx-auto my-8 flex flex-col-reverse items-center justify-center gap-6 pb-12 ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } md:gap-12`}
    >
      <div
        ref={imageRef}
        className={`w-full transition-transform duration-700 ease-out md:w-1/2 ${
          isVisible ? (reverse ? "slide-in-right" : "slide-in-left") : "opacity-0"
        }`}
      >
        <Image
          src={image.url}
          alt={image.altText}
          width={image.width}
          height={image.height}
          className="h-auto w-full rounded object-cover"
        />
      </div>
      <div className="w-full text-center md:w-1/2 md:text-left">
        <h2 className="text-2xl font-bold">{title}</h2>
        <h3 className="my-2 text-xl text-gray-400">{subtitle}</h3>
        <p>{description}</p>
        {buttonLabel && linkUrl && (
          <Link href={linkUrl} passHref>
            <Button className="mt-4 ">{buttonLabel}</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
