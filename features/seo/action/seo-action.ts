import { fetchSeoFromCMS } from "../logic/seo-repo"
import { fetchSEOMetadataUseCase } from "../logic/seo-use-case"

export async function fetchSEOMetadata() {
  const result = await fetchSEOMetadataUseCase({ fetch: fetchSeoFromCMS })

  return result
}
