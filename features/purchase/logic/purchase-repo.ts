import {
  EspagoChecksumData,
  EspagoConfig,
  PurchaseOrderDTO,
  PurchaseOrderFormDTO,
  PurchaseOrderStatusDTO,
} from "@/features/purchase/logic/purchase-type"
import client, { gql } from "@/lib/graph-ql/client"
import { handleGraphQLMutation, handleGraphQLQuery } from "@/lib/graph-ql/graphql-utils"

export function espagoConfigProvider() {
  const url = process.env.ESPAGO_URL!
  const appId = process.env.ESPAGO_APP_ID!
  const isProd = process.env.NODE_ENV === "production"
  const baseURL = isProd ? process.env.HOST_URL! : "http://example.com"
  const successURL = `${baseURL}${isProd ? "/api/zamowienie/success" : "/payments/ok"}`
  const failureURL = `${baseURL}${isProd ? "/api/zamowienie/failure" : "/payments/bad"}`

  return {
    url,
    apiVersion: "3",
    appId: appId,
    sessionId: "1559655843622983577", // Date.now().toString(),
    timestamp: "1444044688", // Math.floor(Date.now() / 1000).toString(),
    paymentId: "payment_id:294", // `Zamowienie:${randomInt(100000, 200000).toString()}`,
    successURL,
    failureURL,
  } satisfies EspagoConfig
}

export function espagoChecksumProvider({ appId, sessionId, amount, currency }: EspagoChecksumData) {
  const secretKey = process.env.ESPAGO_SECRET_KEY
  const checksumData = `${appId}|${sessionId}|${amount}|${currency}|${secretKey}`

  return "938ee2f7729ac4ba1a7c98f5ead8b167" // createHash("md5").update(checksumData).digest("hex")
}

export async function getPurchaseOrderCMS(documentId: string) {
  type PurchaseOrderResponse = {
    paymentId: string
    checksum: string
    purchase_status: PurchaseOrderStatusDTO
    purchase_details: PurchaseOrderFormDTO
  }
  const query = gql`
    query PurchaseOrder($documentId: ID!) {
      purchaseOrder(documentId: $documentId) {
        purchase_status
        purchase_details
      }
    }
  `

  const result = await client.query<{ purchaseOrder: PurchaseOrderResponse }>({
    query,
    variables: {
      documentId,
    },
  })

  const order = handleGraphQLQuery(result).purchaseOrder

  return {
    purchaseDetails: order.purchase_details,
    purchaseStatus: order.purchase_status,
  } satisfies PurchaseOrderDTO
}

export async function savePurchaseOrderCMS(purchase: PurchaseOrderFormDTO) {
  const mutation = gql`
    mutation CreatePurchaseOrder($data: PurchaseOrderInput!) {
      createPurchaseOrder(data: $data) {
        documentId
      }
    }
  `
  const result = await client.mutate<{ createPurchaseOrder: { documentId: string } }>({
    mutation,
    variables: {
      data: {
        purchase_status: "started",
        purchase_details: purchase,
      },
    },
  })

  return { id: handleGraphQLMutation(result).createPurchaseOrder.documentId }
}

export async function updatePurchaseOrderCMS(documentId: string, status: PurchaseOrderStatusDTO) {
  const mutation = gql`
    mutation UpdatePurchaseOrder($documentId: ID!, $data: PurchaseOrderInput!) {
      updatePurchaseOrder(documentId: $documentId, data: $data) {
        documentId
      }
    }
  `
  const result = await client.mutate<{ updatePurchaseOrder: { documentId: string } }>({
    mutation,
    variables: {
      documentId,
      data: {
        purchase_status: status,
      },
    },
  })

  return handleGraphQLMutation(result).updatePurchaseOrder
}
