import { OfferDetailsDTO } from "@/features/offer-details/logic/offer-details-type"
import { FetchOfferList } from "@/features/offer-list/logic/offer-list-use-case"
import { errorResult, executePromise, successResult } from "@/lib/utils"

export async function fetchOfferDetailsUseCase(context: { fetch: FetchOfferList }, id: string) {
  const listResult = await executePromise(() => context.fetch())

  if (!listResult.success) return listResult

  const index = listResult.value.findIndex(item => item.offerId === id)

  if (index === -1) return errorResult("Offer not found")

  return successResult(listResult.value[index].offerDetails as OfferDetailsDTO)
}
