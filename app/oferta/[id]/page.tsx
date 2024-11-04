import ImageCarousel from "@/components/image-carousel"
import ImageText from "@/components/image-text"
import ImageWithButton from "@/components/image-with-button"
import { fetchOfferDetails } from "@/features/offer-details/actions/fetch-offer-details"
import { notFound } from "next/navigation"

export default async function SportPage({ params }: { params: { id: string } }) {
  const offerDetails = await fetchOfferDetails(params.id)

  return (
    <>
      <div>
        {offerDetails.sections.map((section, index) => (
          <ImageText
            key={index}
            title={section.title}
            subtitle={section.subtitle}
            description={section.description}
            image={section.image}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>

      <ImageWithButton alt="sport" buttonLabel="Kup karnet" imageSrc="/sp9.jpg" linkUrl="/oferta" />

      <div className="container mx-auto">
        <ImageCarousel images={offerDetails.imageGallery} />
      </div>
    </>
  )
}
