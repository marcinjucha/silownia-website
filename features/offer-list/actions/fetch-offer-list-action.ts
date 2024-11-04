import { fetchOfferListFromCMS } from "@/features/offer-list/logic/offer-list-repo"
import { fetchOfferListUseCase } from "@/features/offer-list/logic/offer-list-use-case"
import { notFound } from "next/navigation"

export async function fetchOfferList() {
  const result = await fetchOfferListUseCase({ fetch: fetchOfferListFromCMS })

  if (result.success) {
    return result.value
  }

  notFound()
}
