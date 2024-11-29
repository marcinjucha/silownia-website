import { ProductOrderDTO } from "@/features/product-order/logic/product-order-type"
import { clientError, clientResult, execute } from "@/lib/utils"

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
    return clientError("no available orders")
  }

  const result = execute(() => JSON.parse(order) as ProductOrderDTO)

  if (result.success && !result.value.products) {
    return clientError("products are missing")
  }

  return clientResult(result)
}
