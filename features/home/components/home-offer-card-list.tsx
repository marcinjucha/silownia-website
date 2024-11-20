import { fetchHomeOfferList } from "@/features/home/actions/home-offer-list-action"
import HomeOfferCard from "@/features/home/components/home-offer-card"

export default async function HomeOfferCardList() {
  const homeOfferList = await fetchHomeOfferList()

  return (
    <>
      <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {homeOfferList.map(offer => (
          <HomeOfferCard
            key={offer.id}
            title={offer.title}
            image={offer.image}
            linkUrl={`/oferta/${offer.offerId}`}
          />
        ))}
      </div>
    </>
  )
}
