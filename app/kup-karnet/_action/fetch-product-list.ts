"use server"

import { fetchProductListFromCMS } from "@/repos/product-list-repo"
import { fetchProductListUseCase } from "@/use-cases/product-list-use-case"

export async function fetchProductList() {
  const result = await fetchProductListUseCase({ fetch: fetchProductListFromCMS })

  if (result.success) return result.value

  // TODO: Handle error case
  return []
}
