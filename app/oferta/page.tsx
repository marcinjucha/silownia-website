import { Suspense } from "react"
import ImageText from "@/components/image-text"
import LoadingSpinner from "@/components/loading-spinner"
import { fetchOfferList } from "@/features/offer-list/actions/fetch-offer-list-action"

async function OfferListContent() {
  const offerList = await fetchOfferList()

  return (
    <div>
      {offerList.map((offer, index) => (
        <ImageText
          key={offer.id}
          title={offer.title}
          subtitle={offer.subtitle}
          description={offer.description}
          image={offer.image}
          buttonLabel="Dowiedz się więcej..."
          linkUrl={`/oferta/${offer.offerId}`}
          reverse={index % 2 !== 0}
        />
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner message="Ładowanie ofert..." />}>
      <OfferListContent />
    </Suspense>
  )
}
