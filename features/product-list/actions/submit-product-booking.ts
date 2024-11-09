"use server"

import {
  ProductOrderDTO,
  saveProductOrderToCookies,
} from "@/features/purchase/logic/product-order-repo"
import { saveProductOrderUseCase } from "@/features/purchase/logic/product-order-use-case"
import { redirect } from "next/navigation"

export async function submitProductBooking(order: ProductOrderDTO) {
  const result = saveProductOrderUseCase({ saveOrder: saveProductOrderToCookies }, order)

  if (!result.success) {
    return result.error
  }

  redirect(`/kup-karnet/zamowienie`)
}
