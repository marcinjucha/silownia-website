import { executePromise } from "@/lib/utils"
import { OfferDetailsDTO } from "@/repos/offer-details-repo"

export type FetchOfferDetails = (id: string) => Promise<OfferDetailsDTO>

export async function fetchOfferDetailsUseCase(context: { fetch: FetchOfferDetails }, id: string) {
  return await executePromise(() => context.fetch(id))
}
