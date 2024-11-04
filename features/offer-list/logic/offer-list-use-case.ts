import { OfferDTO } from "@/features/common/dtos"
import { executePromise } from "@/lib/utils"

export type FetchOfferList = () => Promise<OfferDTO[]>

export async function fetchOfferListUseCase(context: { fetch: FetchOfferList }) {
  return await executePromise(context.fetch)
}
