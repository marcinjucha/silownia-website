import { OfferDetailsDTO } from "@/features/offer-details/logic/offer-details-type"
import { executePromise } from "@/lib/utils"

export type FetchOfferDetails = (offerId: string) => Promise<OfferDetailsDTO>

export async function fetchOfferDetailsUseCase(context: { fetch: FetchOfferDetails }, id: string) {
  return await executePromise(() => context.fetch(id))
}
