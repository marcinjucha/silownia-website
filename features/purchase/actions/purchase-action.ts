"use server"

import { paymentEspagoConfigUseCase } from "@/features/product-list/logic/product-list-use-case"
import { PurchaseFormData } from "@/features/purchase/actions/purchase-type"
import {
  espagoChecksumProvider,
  espagoConfigProvider,
} from "@/features/purchase/logic/purchase-repo"
import { calculateChecksumUseCase } from "@/features/purchase/logic/purchase-use-case"
import { getProductOrderFromCookies as getCarnetOrderFromCookies } from "@/features/purchase/logic/product-order-repo"
import { getProductOrderUseCase } from "@/features/purchase/logic/product-order-use-case"
import { notFound, redirect } from "next/navigation"
import { match } from "ts-pattern"

export async function getEspagoConfig() {
  const result = await paymentEspagoConfigUseCase({ config: espagoConfigProvider })

  const value = match(result)
    .with({ success: true }, val => val.value)
    .with({ success: false }, () => notFound())
    .exhaustive()

  return value
}

export async function getProductOrder() {
  const result = getProductOrderUseCase({ getProductOrder: getCarnetOrderFromCookies })

  const value = match(result)
    .with({ success: true }, val => val.value)
    .with({ success: false }, () => redirect("/kup-karnet"))
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

  const val = match(result)
    .with({ success: true }, val => ({ checksum: val.value, error: undefined }))
    .with({ success: false }, val => ({ checksum: undefined, error: val.error.message }))
    .exhaustive()

  return val as { checksum?: string; error?: string }
}
