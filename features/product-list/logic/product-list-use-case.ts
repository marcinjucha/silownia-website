import { ProductDTO } from "@/features/product-list/logic/product-list-repo"
import { executePromise } from "@/lib/error-handling"

export type FetchProductList = () => Promise<ProductDTO[]>

export async function fetchProductListUseCase(context: { fetch: FetchProductList }) {
  return await executePromise(context.fetch)
}
