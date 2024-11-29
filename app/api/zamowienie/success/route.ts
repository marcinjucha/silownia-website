import { makeAPIErrorResponseUseCase } from "@/features/common/common-use-cases"
import {
  saveConfirmationStatusToCookies,
  sendPurchaseConfirmationEmailResend,
} from "@/features/confirmation/logic/confirmation-repos"
import {
  saveConfirmationStatusAPIUseCase,
  sendPurchaseConfirmationEmailUseCase,
} from "@/features/confirmation/logic/confirmation-use-cases"
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
  const success = true
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

  const { documentId, purchase } = purchaseResult.value

  const emailResult = await sendPurchaseConfirmationEmailUseCase(
    {
      sendEmail: sendPurchaseConfirmationEmailResend,
    },
    purchase.purchaseDetails,
  )

  if (!emailResult.success) {
    return makeAPIErrorResponseUseCase(success, emailResult.error)
  }

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
