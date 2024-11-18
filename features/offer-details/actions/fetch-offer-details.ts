import { fetchOfferDetailsFromCMS } from "@/features/offer-details/logic/offer-details-repo"
import { fetchOfferDetailsUseCase } from "@/features/offer-details/logic/offer-details-use-case"
import { redirect } from "next/navigation"
import { match } from "ts-pattern"

export async function fetchOfferDetails(id: string) {
  const result = await fetchOfferDetailsUseCase(
    {
      fetch: fetchOfferDetailsFromCMS,
    },
    id,
  )

  const offer = match(result)
    .with({ success: true }, val => val.value)
    .with({ success: false }, () => redirect("/oferta"))
    .exhaustive()

  return offer
}
