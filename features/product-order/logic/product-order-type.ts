export type ProductOrderDTO = {
  products: ProductOrderItemDTO[]
}

export type ProductOrderItemDTO = {
  name: string
  quantity: number
  price: number
  totalPrice: number
}
