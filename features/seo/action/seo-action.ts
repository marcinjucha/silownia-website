import { fetchSeoFromCMS } from "@/features/seo/logic/seo-repo"
import { fetchSEOMetadataUseCase } from "@/features/seo/logic/seo-use-case"
import { NextjsMetadata } from "@/features/seo/logic/seo-type"

export async function fetchSEOMetadata(): Promise<NextjsMetadata | null> {
  const result = await fetchSEOMetadataUseCase({ fetch: fetchSeoFromCMS })

  if (result.isFailure) {
    return null
  }

  return result.value
}
