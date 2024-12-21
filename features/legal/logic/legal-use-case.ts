import { LegalDTO } from "@/features/legal/logic/legal-type"
import { executePromise, clientError, clientValue } from "@/lib/utils"

export type FetchLegalData = () => Promise<LegalDTO>

export async function fetchRegulaminUseCase(context: { fetch: FetchLegalData }) {
  const result = await executePromise(context.fetch)

  if (!result.success) {
    return clientError<LegalDTO>("Błąd podczas pobierania danych regulaminu")
  }

  return clientValue(result.value)
}

export async function fetchPrivacyTermsUseCase(context: { fetch: FetchLegalData }) {
  const result = await executePromise(context.fetch)

  if (!result.success) {
    return clientError<LegalDTO>("Błąd podczas pobierania polityki prywatności")
  }

  return clientValue(result.value)
}
