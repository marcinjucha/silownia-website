import { OfferDetailsDTO } from "@/features/offer-details/logic/offer-details-type"
import { ExecutionResult, executePromise } from "@/lib/error-handling"

export type FetchOfferDetails = (offerId: string) => Promise<OfferDetailsDTO | null>

export async function fetchOfferDetailsUseCase(
  context: { fetch: FetchOfferDetails },
  id: string,
): Promise<ExecutionResult<OfferDetailsDTO, Error>> {
  const result = await executePromise(() => context.fetch(id))

  if (!result.success || !result.value) {
    return {
      success: false,
      isFailure: true,
      error: new Error("Offer not found"),
    }
  }

  return { success: true, isFailure: false, value: result.value }
}
