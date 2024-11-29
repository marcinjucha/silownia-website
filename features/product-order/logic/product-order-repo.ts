import { ProductOrderDTO } from "@/features/product-order/logic/product-order-type"
import { cookies } from "next/headers"

const cookieKey = "order"

export function saveProductOrderToCookies(order: ProductOrderDTO) {
  const jsonOrder = JSON.stringify(order)
  cookies().set(cookieKey, jsonOrder)
}

export function getProductOrderFromCookies() {
  return cookies().get(cookieKey)?.value
}
