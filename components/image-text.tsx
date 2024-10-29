"use client"
import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

interface ImageTextProps {
  title: string
  subtitle: string
  text: string
  imageSrc: string
  buttonLabel?: string
  linkUrl?: string
  reverse?: boolean
}

export default function ImageText({
  title,
  subtitle,
  text,
  imageSrc,
  buttonLabel,
  linkUrl,
  reverse = false,
}: ImageTextProps) {
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
      className={`mx-auto my-8 flex flex-col-reverse items-center justify-center gap-6 pb-12 ${
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
          src={imageSrc}
          alt={title}
          width={500}
          height={300}
          className="h-auto w-full rounded object-cover"
        />
      </div>
      <div className="w-full text-center md:w-1/2 md:text-left">
        <h2 className="text-2xl font-bold">{title}</h2>
        <h3 className="mb-4 text-xl text-gray-600">{subtitle}</h3>
        <p>{text}</p>
        {buttonLabel && linkUrl && (
          <Link
            href={linkUrl}
            className="btn mt-4 inline-block rounded border border-black px-6 py-2 text-lg font-medium"
          >
            {buttonLabel}
          </Link>
        )}
      </div>
    </div>
  )
}
