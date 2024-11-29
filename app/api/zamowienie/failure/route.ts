import { makeAPIErrorResponseUseCase } from "@/features/common/common-use-cases"
import { saveConfirmationStatusToCookies } from "@/features/confirmation/logic/confirmation-repos"
import { saveConfirmationStatusAPIUseCase } from "@/features/confirmation/logic/confirmation-use-cases"
import {
  espagoChecksumProvider,
  getPurchaseOrderCMS,
  updatePurchaseOrderCMS,
} from "@/features/purchase/logic/purchase-repo"
import {
  getPurchaseOrderAPIUseCase,
  updatePurchaseOrderStatusAPIUseCase,
} from "@/features/purchase/logic/purchase-use-cases"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const success = false
  const purchaseResult = await getPurchaseOrderAPIUseCase(
    {
      espageChecksumProvider: espagoChecksumProvider,
      getPurchaseOrder: getPurchaseOrderCMS,
    },
    {
      params: req.nextUrl.searchParams,
    },
  )

  if (!purchaseResult.success) {
    return makeAPIErrorResponseUseCase(success, purchaseResult.error)
  }

  const { documentId } = purchaseResult.value

  const updateResult = await updatePurchaseOrderStatusAPIUseCase(
    {
      updatePurchaseOrderStatus: updatePurchaseOrderCMS,
    },
    { documentId, success },
  )

  if (!updateResult.success) {
    return makeAPIErrorResponseUseCase(success, updateResult.error)
  }

  const confirmationResult = saveConfirmationStatusAPIUseCase(
    {
      saveStatus: saveConfirmationStatusToCookies,
    },
    { success },
  )

  if (!confirmationResult.success) {
    return makeAPIErrorResponseUseCase(success, confirmationResult.error)
  }

  redirect("/kup-karnet/potwierdzenie")
}
