import { APIResponseStatusDTO } from "@/features/common/common-dtos"
import {
  EspagoChecksumData,
  PurchaseOrderDTO,
  PurchaseOrderFormDTO,
  PurchaseOrderStatusDTO,
} from "@/features/purchase/logic/purchase-type"
import { decrypt, encrypt } from "@/lib/encryption"
import {
  clientError,
  clientResult,
  execute,
  executeError,
  executePromise,
  executeValue,
  ExecutionResult,
  stringify,
} from "@/lib/utils"
import { match } from "ts-pattern"

export type EspagoChecksumProvider = (data: EspagoChecksumData) => string

export function calculateChecksumUseCase(
  context: {
    espageChecksumProvider: EspagoChecksumProvider
  },
  data: EspagoChecksumData,
) {
  const checksumResult = execute(() => context.espageChecksumProvider(data))

  return match(checksumResult)
    .with({ success: true }, clientResult)
    .with({ success: false }, () => clientError("Błąd serwera"))
    .exhaustive()
}

export type SavePurchaseOrder = (order: PurchaseOrderFormDTO) => Promise<{ id: string }>
const hashSeparator = "#*#"
export async function savePurchaseOrderUseCase(
  context: { save: SavePurchaseOrder },
  order: PurchaseOrderFormDTO,
) {
  const saveResult = await executePromise(() => context.save(order))

  const result = match(saveResult)
    .with({ success: true }, val =>
      clientResult(
        execute(() =>
          encrypt(
            `${val.value.id}${hashSeparator}${order.paymentId}${hashSeparator}${order.checksum}`,
          ),
        ),
      ),
    )
    .with({ success: false }, () => clientError("Nie udało się zrealizować zamówienia"))
    .exhaustive()

  return result
}

export type UpdatePurchaseOrderStatus = (
  documentId: string,
  status: PurchaseOrderStatusDTO,
) => Promise<{ documentId: string }>
export type GetPurchaseOrder = (documentId: string) => Promise<PurchaseOrderDTO>

export async function getPurchaseOrderAPIUseCase(
  context: {
    espageChecksumProvider: EspagoChecksumProvider
    getPurchaseOrder: GetPurchaseOrder
  },
  data: {
    params: URLSearchParams
  },
) {
  type Result = ExecutionResult<
    { documentId: string; purchase: PurchaseOrderDTO },
    APIResponseStatusDTO
  >

  const { params } = data

  // Extract the parameters
  const purchaseId = params.get("purchaseId")

  if (!purchaseId) {
    return executeError({
      statusCode: 400,
      message: "Purchase id is missing",
    }) as Result
  }

  const decryptResult = execute(() => decrypt(purchaseId).split(hashSeparator))

  if (!decryptResult.success) {
    return executeError({
      statusCode: 400,
      message: `Decryption failed - ${decryptResult.error}`,
    }) as Result
  }

  const [documentId, paymentId, checksum] = decryptResult.value

  const purchaseOrderResult = await executePromise(() => context.getPurchaseOrder(documentId))

  if (!purchaseOrderResult.success) {
    return executeError({
      statusCode: 404,
      message: `Purchase order not found - ${purchaseOrderResult.error}`,
    }) as Result
  }

  const purchaseOrder = purchaseOrderResult.value

  if (
    purchaseOrder.purchaseDetails.checksum !== checksum ||
    purchaseOrder.purchaseDetails.paymentId !== paymentId ||
    purchaseOrder.purchaseStatus !== "started"
  ) {
    return executeError({
      statusCode: 404,
      message: `Purchase order data doesn't match - expected: ${decryptResult.value.toString()}, got ${stringify(purchaseOrder)}`,
    }) as Result
  }

  return executeValue({
    documentId,
    purchase: purchaseOrder,
  }) as Result
}

export async function updatePurchaseOrderStatusAPIUseCase(
  context: { updatePurchaseOrderStatus: UpdatePurchaseOrderStatus },
  data: { documentId: string; success: boolean },
) {
  const { documentId, success } = data
  const status: PurchaseOrderStatusDTO = success ? "successful" : "failure"

  const result = await executePromise(() => context.updatePurchaseOrderStatus(documentId, status))

  if (result.success) {
    return executeValue(result.value)
  }

  return executeError({
    statusCode: 500,
    message: `Purchase order status failed - ${stringify(data)}; error - ${result.error}`,
  } satisfies APIResponseStatusDTO)
}
