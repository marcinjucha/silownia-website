import { fetchJsonLdFromCMS } from "@/features/seo/logic/json-ld-repo"
import { fetchJsonLdUseCase } from "@/features/seo/logic/json-ld-use-case"
import { JsonLdDTO } from "@/features/seo/logic/json-ld-type"

export async function fetchJSONLD(): Promise<JsonLdDTO[] | null> {
  const result = await fetchJsonLdUseCase({ fetch: fetchJsonLdFromCMS })

  if (result.isFailure) {
    return null
  }

  return result.value
}
