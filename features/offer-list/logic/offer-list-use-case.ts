import { OfferDTO } from "@/features/offer-list/logic/offer-list-type"
import { executePromise } from "@/lib/utils"

export type FetchOfferList = () => Promise<OfferDTO[]>

export async function fetchOfferListUseCase(context: { fetch: FetchOfferList }) {
  return await executePromise(context.fetch)
}
