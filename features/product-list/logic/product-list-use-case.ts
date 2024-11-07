import { executePromise } from "@/lib/utils"
import { ProductDTO } from "@/features/product-list/logic/product-list-repo"

export type FetchProductList = () => Promise<ProductDTO[]>

export async function fetchProductListUseCase(context: { fetch: FetchProductList }) {
  return await executePromise(context.fetch)
}
