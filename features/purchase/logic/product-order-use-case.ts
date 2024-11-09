import { errorResult, execute } from "@/lib/utils"
import { ProductOrderDTO } from "@/features/purchase/logic/product-order-repo"

export type SaveProductOrder = (order: ProductOrderDTO) => void
export type GetProductOrder = () => string | undefined

export function saveProductOrderUseCase(
  context: { saveOrder: SaveProductOrder },
  order: ProductOrderDTO,
) {
  return execute(() => context.saveOrder(order))
}

export function getProductOrderUseCase(context: { getProductOrder: GetProductOrder }) {
  const order = context.getProductOrder()

  if (!order) {
    return errorResult("no available orders")
  }

  const result = execute(() => JSON.parse(order) as ProductOrderDTO)

  if (result.success && !result.value.products) {
    return errorResult("products are missing")
  }

  return result
}
