import { LegalDTO } from "@/features/legal/logic/legal-type"
import { clientError, clientValue, executePromise } from "@/lib/error-handling"

export type FetchLegalData = () => Promise<LegalDTO | null>

export async function fetchRegulaminUseCase(context: { fetch: FetchLegalData }) {
  const result = await executePromise(context.fetch)

  if (!result.success || !result.value) {
    return clientError<LegalDTO>("Błąd podczas pobierania danych regulaminu")
  }

  return clientValue(result.value)
}

export async function fetchPrivacyTermsUseCase(context: { fetch: FetchLegalData }) {
  const result = await executePromise(context.fetch)

  if (!result.success || !result.value) {
    return clientError<LegalDTO>("Błąd podczas pobierania polityki prywatności")
  }

  return clientValue(result.value)
}
