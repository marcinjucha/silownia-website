import { ProductOrderItemDTO } from "@/features/product-order/logic/product-order-type"

export type EspagoConfig = {
  url: string
  apiVersion: string
  appId: string
  sessionId: string
  timestamp: string
  paymentId: string
  successURL: string
  failureURL: string
}

export type EspagoChecksumData = {
  appId: string
  sessionId: string
  amount: string
  currency: string
}

export type PurchaseOrderStatusDTO = "started" | "cancelled" | "failure" | "successful"

export type PurchaseOrderDTO = {
  purchaseStatus: PurchaseOrderStatusDTO
  purchaseDetails: PurchaseOrderFormDTO
}

export type PurchaseOrderFormDTO = {
  paymentId: string
  checksum: string
  firstName: string
  lastName: string
  email: string
  otherNotes?: string
  products: ProductOrderItemDTO[]
}
