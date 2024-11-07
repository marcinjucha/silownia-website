"use server"

import { fetchProductListFromCMS } from "@/features/product-list/logic/product-list-repo"
import { fetchProductListUseCase } from "@/features/product-list/logic/product-list-use-case"

export async function fetchProductList() {
  const result = await fetchProductListUseCase({ fetch: fetchProductListFromCMS })

  if (result.success) return result.value

  // TODO: Handle error case
  return []
}
