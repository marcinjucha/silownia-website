import { ProductOrderDTO } from "@/features/product-order/logic/product-order-type"
import { cookies } from "next/headers"

const cookieKey = "order"

export async function saveProductOrderToCookies(order: ProductOrderDTO) {
  const jsonOrder = JSON.stringify(order)
  ;(await cookies()).set(cookieKey, jsonOrder)
}

export async function getProductOrderFromCookies() {
  return (await cookies()).get(cookieKey)?.value
}
