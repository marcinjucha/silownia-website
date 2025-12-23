import { Suspense } from "react"
import TextControl from "@/components/controls/text"
import ImageCarousel from "@/components/image-carousel"
import ImageText from "@/components/image-text"
import ImageWithButton from "@/components/image-with-button"
import LoadingSpinner from "@/components/loading-spinner"
import { fetchOfferDetails } from "@/features/offer-details/actions/fetch-offer-details"
import { fetchOfferListForStaticParams } from "@/features/offer-list/actions/fetch-offer-list-for-static-params"
import TrainerCard from "@/features/offer-details/components/trainer-card"

// Pre-renderuj wszystkie oferty w build time
export async function generateStaticParams() {
  const offers = await fetchOfferListForStaticParams()
  return offers.map(offer => ({
    id: offer.offerId,
  }))
}

async function OfferDetailsContent({ id }: { id: string }) {
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

      <div className="container mx-auto">
        <div>
          <TextControl className="text-primary my-2 text-center" {...details.trainersTitle} />
        </div>
        <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {details.trainers.map((trainer, index) => (
            <TrainerCard
              key={index}
              image={trainer.image}
              title={trainer.title}
              description={trainer.description}
            />
          ))}
        </div>
      </div>

      <ImageWithButton
        buttonLabel="Kup karnet"
        image={details.offerImage}
        linkUrl="https://progressgymelitead-wroclaw.cms.efitness.com.pl/kup-karnet#stepsanchor"
      />

      {details.imageGallery && (
        <div className="container mx-auto">
          <ImageCarousel images={details.imageGallery} />
        </div>
      )}
    </>
  )
}

export default async function OfferDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <Suspense fallback={<LoadingSpinner message="Ładowanie szczegółów oferty..." />}>
      <OfferDetailsContent id={id} />
    </Suspense>
  )
}
