import { OfferDTO } from "@/features/common/dtos"
import { fetchOfferListFromCMS } from "@/features/offer-list/logic/offer-list-repo"
import { fetchOfferListUseCase } from "@/features/offer-list/logic/offer-list-use-case"
import { notFound } from "next/navigation"
import { match } from "ts-pattern"

export async function fetchOfferList() {
  const result = await fetchOfferListUseCase({ fetch: fetchOfferListFromCMS })

  const val = match(result)
    .with({ success: true }, val => val.value)
    .with({ success: false }, () => notFound())
    .exhaustive()

  return val
}
