import { ProductOrderDTO } from "@/features/product-order/logic/product-order-type"
import { clientError, clientResult, execute, executePromise } from "@/lib/utils"

export type SaveProductOrder = (order: ProductOrderDTO) => Promise<void>
export type GetProductOrder = () => Promise<string | undefined>

export async function saveProductOrderUseCase(
  context: { saveOrder: SaveProductOrder },
  order: ProductOrderDTO,
) {
  return await executePromise(() => context.saveOrder(order))
}

export async function getProductOrderUseCase(context: { getProductOrder: GetProductOrder }) {
  const order = await context.getProductOrder()

  if (!order) {
    return clientError("no available orders")
  }

  const result = execute(() => JSON.parse(order) as ProductOrderDTO)

  if (result.success && !result.value.products) {
    return clientError("products are missing")
  }

  return clientResult(result)
}
