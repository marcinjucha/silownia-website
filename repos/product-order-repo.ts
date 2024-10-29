import { PaymentMethodDTO } from "@/repos/purchase-repo"
import { cookies } from "next/headers"

export type ProductOrderDTO = {
  products: ProductOrderItemDTO[]
}

export type ProductOrderItemDTO = {
  name: string
  quantity: number
  price: number
  totalPrice: number
}

const cookieKey = "order"

export function saveProductOrderToCookies(order: ProductOrderDTO) {
  const jsonOrder = JSON.stringify(order)
  cookies().set(cookieKey, jsonOrder)
}

export function getProductOrderFromCookies() {
  return cookies().get(cookieKey)?.value
}
