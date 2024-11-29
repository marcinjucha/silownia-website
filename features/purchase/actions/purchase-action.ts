"use server"

import { paymentEspagoConfigUseCase } from "@/features/product-list/logic/product-list-use-case"
import { PurchaseFormData } from "@/features/purchase/actions/purchase-type"
import {
  espagoChecksumProvider,
  espagoConfigProvider,
  savePurchaseOrderCMS,
} from "@/features/purchase/logic/purchase-repo"
import { PurchaseOrderFormDTO } from "@/features/purchase/logic/purchase-type"
import {
  calculateChecksumUseCase,
  savePurchaseOrderUseCase,
} from "@/features/purchase/logic/purchase-use-cases"
import { notFound } from "next/navigation"
import { match } from "ts-pattern"

export async function getEspagoConfig() {
  const result = await paymentEspagoConfigUseCase({ config: espagoConfigProvider })

  const value = match(result)
    .with({ success: true }, val => val.value)
    .with({ success: false }, () => notFound())
    .exhaustive()

  return value
}

export async function calculateChecksum(formData: PurchaseFormData) {
  const result = calculateChecksumUseCase(
    { espageChecksumProvider: espagoChecksumProvider },
    {
      appId: formData.app_id,
      sessionId: formData.session_id,
      amount: formData.amount.toString(),
      currency: formData.currency,
    },
  )

  return result
}

export async function savePurchaseOrder(order: PurchaseOrderFormDTO) {
  const result = await savePurchaseOrderUseCase({ save: savePurchaseOrderCMS }, order)

  return result
}
