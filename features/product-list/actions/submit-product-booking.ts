"use server"

import { saveProductOrderToCookies } from "@/features/product-order/logic/product-order-repo"
import { ProductOrderDTO } from "@/features/product-order/logic/product-order-type"
import { saveProductOrderUseCase } from "@/features/product-order/logic/product-order-use-case"
import { redirect } from "next/navigation"

export async function submitProductBooking(order: ProductOrderDTO) {
  const result = saveProductOrderUseCase({ saveOrder: saveProductOrderToCookies }, order)

  if (!result.success) {
    return result.error
  }

  redirect(`/kup-karnet/zamowienie`)
}
