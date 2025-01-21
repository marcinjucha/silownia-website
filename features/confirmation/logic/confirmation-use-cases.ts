import { APIResponseStatusDTO } from "@/features/common/common-dtos"
import { ConfirmationStatusDTO } from "@/features/confirmation/logic/confirmation-types"
import { PurchaseOrderFormDTO } from "@/features/purchase/logic/purchase-type"
import { decrypt, encrypt } from "@/lib/encryption"
import {
  clientResult,
  execute,
  executeError,
  executePromise,
  executeValue,
  ExecutionResult,
} from "@/lib/utils"

export type ConfirmationStatusProvider = () => Promise<string>

export async function getConfirmationStatusUseCase(context: {
  statusProvider: ConfirmationStatusProvider
}) {
  return clientResult(
    await executePromise(
      async () => JSON.parse(decrypt(await context.statusProvider())) as ConfirmationStatusDTO,
    ),
  )
}

export type SaveConfirmationStatus = (status: string) => void

export function saveConfirmationStatusAPIUseCase(
  context: {
    saveStatus: SaveConfirmationStatus
  },
  status: ConfirmationStatusDTO,
) {
  const result = execute(() => context.saveStatus(encrypt(JSON.stringify(status))))

  if (result.success) {
    return executeValue(result.value)
  }

  return executeError({
    statusCode: 500,
    message: `Saving confirmation status failed - ${result.error}`,
  } satisfies APIResponseStatusDTO)
}

export type SendConfirmationEmail = (
  purchase: PurchaseOrderFormDTO,
) => Promise<ExecutionResult<string, string>>

export async function sendPurchaseConfirmationEmailUseCase(
  context: { sendEmail: SendConfirmationEmail },
  purchase: PurchaseOrderFormDTO,
) {
  const result = await executePromise(() => context.sendEmail(purchase))

  const errorMessage = {
    statusCode: 500,
    message: "Błąd serwera - email nie został wysłany. Proszę o kontakt z administracją.",
  } satisfies APIResponseStatusDTO
  if (!result.success) {
    console.error("Send purchase confirmation email error", result.error)
    return executeError(errorMessage)
  }

  if (!result.value.success) {
    return executeError(errorMessage)
  }

  return executeValue(result.value.value)
}
