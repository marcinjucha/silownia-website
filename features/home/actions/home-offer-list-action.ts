import { fetchHomeOfferListFromCMS } from "@/features/home/logic/home-offer-list-repo"
import { fetchHomeOfferListUseCase } from "@/features/home/logic/home-offer-list-use-case"
import { notFound } from "next/navigation"
import { match } from "ts-pattern"

export async function fetchHomeOfferList() {
  const result = await fetchHomeOfferListUseCase({ fetch: fetchHomeOfferListFromCMS })

  const val = match(result)
    .with({ success: true }, val => val.value)
    .with({ success: false }, () => notFound())
    .exhaustive()

  return val
}
