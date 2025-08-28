"use server"

import { FetchJsonLd, JsonLdClientResult } from "@/features/seo/logic/json-ld-type"
import { clientError, clientValue, executePromise } from "@/lib/error-handling"

export async function fetchJsonLdUseCase(context: {
  fetch: FetchJsonLd
}): Promise<JsonLdClientResult> {
  const result = await executePromise(async () => await context.fetch())

  if (result.isFailure) {
    return clientError("Failed to fetch JSON-LD from CMS")
  }

  return clientValue(result.value)
}
