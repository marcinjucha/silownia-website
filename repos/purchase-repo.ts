import { ProductOrderDTO } from "@/repos/product-order-repo"

export enum PaymentMethodDTO {
  PAYPAL = "PayPal",
}

export type ProductPurchaseDTO = {
  firstName: string
  lastName: string
  email: string
  orderNotes?: string
  order: ProductOrderDTO
  paymentMethod: PaymentMethodDTO
}

export async function invokePayments(purchase: ProductPurchaseDTO) {
  return Promise.resolve()
}
