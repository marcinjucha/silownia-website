"use client"
import { notFound } from "next/navigation"
import ImageWithButton from "@/components/image-with-button"
import ImageText from "@/components/image-text"
import ImageCarousel from "@/components/image-carousel"
import { fetchOffer } from "./_action/fetch-offer"

export default function SportPage({ params }: { params: { sport: string } }) {
  const sportData = fetchOffer(params.sport)

  if (!sportData) {
    return notFound()
  }

  return (
    <>
      <div>
        {sportData.sections.map((section, index) => (
          <ImageText
            key={section.title}
            title={section.title}
            subtitle={section.subtitle}
            text={section.text}
            imageSrc={section.imageSrc}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>

      <ImageWithButton alt="sport" buttonLabel="Kup karnet" imageSrc="/sp9.jpg" linkUrl="/oferta" />

      <div className="container mx-auto">
        <ImageCarousel images={sportData.carouselImages} />
      </div>
    </>
  )
}
