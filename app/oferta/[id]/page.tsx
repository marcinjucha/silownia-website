import ImageCarousel from "@/components/image-carousel"
import ImageText from "@/components/image-text"
import ImageWithButton from "@/components/image-with-button"
import { fetchOfferDetails } from "@/features/offer-details/actions/fetch-offer-details"

export default async function OfferDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const details = await fetchOfferDetails(id)

  return (
    <>
      <div>
        {details.sections.map((section, index) => (
          <ImageText
            key={index}
            title={section.title}
            subtitle={section.subtitle}
            description={section.description || ""}
            image={section.image}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>

      <ImageWithButton buttonLabel="Kup karnet" image={details.offerImage} linkUrl="/kup-karnet" />

      {details.imageGallery && (
        <div className="container mx-auto">
          <ImageCarousel images={details.imageGallery} />
        </div>
      )}
    </>
  )
}
