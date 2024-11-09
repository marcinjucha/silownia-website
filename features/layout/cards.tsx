import React from "react"
import Image from "next/image"

const offers = [
  {
    id: 1,
    imageSrc: "/images/siłownia.jpeg",
    altText: "Offer 1",
    buttonText: "Siłownia",
  },
  {
    id: 2,
    imageSrc: "/images/stretching.jpeg",
    altText: "Offer 2",
    buttonText: "Fitness",
  },
  {
    id: 3,
    imageSrc: "/images/joga.jpeg",
    altText: "Offer 3",
    buttonText: "Joga",
  },
  {
    id: 4,
    imageSrc: "/images/sporty-walki.jpeg",
    altText: "Offer 4",
    buttonText: "Sporty Walki",
  },
  {
    id: 5,
    imageSrc: "/images/pole-dance.jpeg",
    altText: "Offer 7",
    buttonText: "Pole Dance",
  },
  {
    id: 6,
    imageSrc: "/images/akrobatyka.jpeg",
    altText: "Offer 6",
    buttonText: "Akrobatyka",
  },
]

export default function Cards() {
  return (
    <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {offers.map(offer => (
        <div
          key={offer.id}
          className="relative flex h-80 flex-col items-center justify-center overflow-hidden rounded-lg bg-secondary shadow-lg"
        >
          <Image src={offer.imageSrc} alt={offer.altText} className="object-cover" fill />
          <button className="absolute bottom-4 transform rounded-md bg-primary px-4 py-2 text-foreground transition-transform duration-300 ease-in-out hover:scale-125">
            {offer.buttonText}
          </button>
        </div>
      ))}
    </div>
  )
}
