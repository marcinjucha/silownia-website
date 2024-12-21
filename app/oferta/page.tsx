import ImageText from "@/components/image-text"
import { fetchOfferList } from "@/features/offer-list/actions/fetch-offer-list-action"

export default async function Home() {
  const offerList = await fetchOfferList()

  return (
    <>
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
    </>
  )
}
