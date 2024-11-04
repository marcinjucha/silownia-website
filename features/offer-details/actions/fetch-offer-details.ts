import { fetchOfferDetailsUseCase } from "@/features/offer-details/logic/offer-details-use-case"
import { fetchOfferListFromCMS } from "@/features/offer-list/logic/offer-list-repo"
import { redirect } from "next/navigation"

export async function fetchOfferDetails(id: string) {
  const result = await fetchOfferDetailsUseCase(
    {
      fetch: fetchOfferListFromCMS,
    },
    id,
  )

  if (!result.success) redirect("/oferta")

  return result.value
}
