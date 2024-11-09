import { ConfirmationStatusDTO } from "@/features/confirmation/logic/confirmation-repo"
import { EspagoChecksumData } from "@/features/purchase/logic/purchase-repo"
import { encrypt } from "@/lib/encryption"
import { errorResult, execute, successResult } from "@/lib/utils"
import { match } from "ts-pattern"

export type EspagoChecksumProvider = (data: EspagoChecksumData) => string
export type SetConfirmationStatus = (status: string) => void

export function calculateChecksumUseCase(
  context: {
    espageChecksumProvider: EspagoChecksumProvider
  },
  data: EspagoChecksumData,
) {
  return execute(() => context.espageChecksumProvider(data))
}

export function paymentConfirmationAPIUseCase(
  context: {
    espageChecksumProvider: EspagoChecksumProvider
    saveConfirmationStatus: SetConfirmationStatus
  },
  data: {
    params: URLSearchParams
    success: boolean
  },
) {
  const { params, success } = data
  console.log("log: params", params)

  // Extract the parameters
  const appId = params.get("appId")
  const sessionId = params.get("sessionId")
  const amount = params.get("amount")
  const currency = params.get("currency")
  const checksum = params.get("checksum")

  const error = errorResult("invalid")
  if (!appId || !sessionId || !amount || !currency || !checksum) {
    return error
  }

  const checksumResult = calculateChecksumUseCase(context, {
    appId,
    amount,
    currency,
    sessionId,
  })

  const result = match(checksumResult)
    .with({ success: false }, () => error)
    .when(
      val => val.value === checksum,
      val => successResult(""),
    )
    .when(
      val => val.value !== checksum,
      val => error,
    )
    .otherwise(() => error)

  if (result.success) {
    context.saveConfirmationStatus(
      encrypt(JSON.stringify({ success } satisfies ConfirmationStatusDTO)),
    )
  }

  return result
}
