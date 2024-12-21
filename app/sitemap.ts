import { fetchOfferList } from "@/features/offer-list/actions/fetch-offer-list-action"

export default async function sitemap() {
  const fetchOffers = await fetchOfferList()
  const offers = fetchOffers?.map((offers: any) => {
    return {
      url: `https://progressgymacademy.pl/oferta/${offers.offerId}`,
    }
  })

  return [
    {
      url: "https://progressgymacademy.pl",
    },
    {
      url: "https://progressgymacademy.pl/oferta",
    },
    { url: "https://progressgymacademy.pl/kup-karnet" },
    ...offers,
  ]
}
