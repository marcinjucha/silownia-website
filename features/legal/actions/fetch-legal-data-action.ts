import { fetchPrivacyTermsFromCMS, fetchRegulaminFromCMS } from "@/features/legal/logic/legal-repo"
import {
  fetchPrivacyTermsUseCase,
  fetchRegulaminUseCase,
} from "@/features/legal/logic/legal-use-case"
import { notFound } from "next/navigation"
import { match } from "ts-pattern"

export async function fetchPrivacyTerms() {
  const result = await fetchPrivacyTermsUseCase({ fetch: fetchPrivacyTermsFromCMS })

  const val = match(result)
    .with({ success: true }, val => val.value)
    .with({ success: false }, () => notFound())
    .exhaustive()

  return val
}

export async function fetchRegulamin() {
  const result = await fetchRegulaminUseCase({ fetch: fetchRegulaminFromCMS })

  const val = match(result)
    .with({ success: true }, val => val.value)
    .with({ success: false }, () => notFound())
    .exhaustive()

  return val
}
