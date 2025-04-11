import { HomeOfferDTO } from "@/features/home/logic/home-offer-list-type"
import { executePromise } from "@/lib/error-handling"

export type FetchHomeOfferList = () => Promise<HomeOfferDTO[]>

export async function fetchHomeOfferListUseCase(context: { fetch: FetchHomeOfferList }) {
  return await executePromise(context.fetch)
}
