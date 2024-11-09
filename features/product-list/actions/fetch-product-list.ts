"use server"

import { fetchProductListFromCMS } from "@/features/product-list/logic/product-list-repo"
import { fetchProductListUseCase } from "@/features/product-list/logic/product-list-use-case"
import { match } from "ts-pattern"

export async function fetchProductList() {
  const result = await fetchProductListUseCase({ fetch: fetchProductListFromCMS })

  return (
    match(result)
      .with({ success: true }, result => result.value)
      // TODO: Handle error case
      .otherwise(() => [])
  )
}
