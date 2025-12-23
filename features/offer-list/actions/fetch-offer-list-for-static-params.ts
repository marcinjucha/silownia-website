import { fetchOfferListFromCMS } from "@/features/offer-list/logic/offer-list-repo"
import { fetchOfferListUseCase } from "@/features/offer-list/logic/offer-list-use-case"

export async function fetchOfferListForStaticParams() {
  const result = await fetchOfferListUseCase({ fetch: fetchOfferListFromCMS })

  if (!result.success) {
    console.error("Error fetching offer list for static params:", result.error)
    return []
  }

  return result.value
}
