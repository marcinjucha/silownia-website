"use server"

import { PurchaseFormData } from "@/app/kup-karnet/zamowienie/_actions/purchase-type"
import { PaymentMethodDTO } from "@/repos/purchase-repo"
import { ProductOrderDTO } from "@/repos/product-order-repo"
import { redirect } from "next/navigation"
import { submitProductOrderUseCase } from "@/use-cases/purchase-use-case"

export async function submitPurchaseForm(
  formData: PurchaseFormData,
  order: ProductOrderDTO,
  paymentMethod: PaymentMethodDTO,
) {
  const result = await submitProductOrderUseCase(
    {},
    {
      ...formData,
      order,
      paymentMethod,
    },
  )

  if (result.success) {
    redirect("/kup-karnet/potwierdzenie")
  }

  return result
}
