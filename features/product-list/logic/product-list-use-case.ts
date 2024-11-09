import { ProductDTO } from "@/features/product-list/logic/product-list-repo"
import { EspagoConfig } from "@/features/purchase/logic/purchase-repo"
import { execute, executePromise } from "@/lib/utils"

export type FetchProductList = () => Promise<ProductDTO[]>
export type PaymentEspagoConfigProvider = () => EspagoConfig

export async function paymentEspagoConfigUseCase(context: { config: PaymentEspagoConfigProvider }) {
  return execute(context.config)
}

export async function fetchProductListUseCase(context: { fetch: FetchProductList }) {
  return await executePromise(context.fetch)
}
