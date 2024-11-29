import { clone } from "@/lib/utils"
import {
  getProductOrderUseCase,
  SaveProductOrder,
  saveProductOrderUseCase,
} from "@/features/product-order/logic/product-order-use-case"
import { ProductOrderDTO } from "@/features/product-order/logic/product-order-type"

describe("Product order use case", () => {
  const order = {
    products: [
      {
        name: "prod-1",
        price: 1,
        quantity: 3,
        totalPrice: 3,
      },
      {
        name: "prod-2",
        price: 2,
        quantity: 4,
        totalPrice: 8,
      },
    ],
  } satisfies ProductOrderDTO

  describe("save product order", () => {
    it("success", () => {
      const saveOrder = jest.fn()

      const result = saveProductOrderUseCase({ saveOrder }, clone(order))

      if (result.success) {
        expect(saveOrder).toHaveBeenCalledWith({ ...order })
        expect(saveOrder).toHaveBeenCalledTimes(1)
      } else {
        fail()
      }
    })

    it("failure", () => {
      const msg = "fail product order"
      const saveOrder: SaveProductOrder = () => {
        throw new Error(msg)
      }

      const result = saveProductOrderUseCase({ saveOrder }, clone(order))

      if (result.success) fail()
      else expect(result.error.message).toEqual(msg)
    })
  })

  describe("get product order", () => {
    const getProductOrder = jest.fn()

    it("no orders", () => {
      getProductOrder.mockReturnValue(undefined)

      const result = getProductOrderUseCase({ getProductOrder })

      if (result.success) fail()
      else expect(result.error).toEqual("no available orders")
    })

    it("invalid order", () => {
      getProductOrder.mockReturnValue(JSON.stringify(order.products))

      const result = getProductOrderUseCase({ getProductOrder })

      if (result.success) fail()
      else expect(result.error).toEqual("products are missing")
    })

    it("valid order", () => {
      getProductOrder.mockReturnValue(JSON.stringify(clone(order)))

      const result = getProductOrderUseCase({ getProductOrder })

      if (result.success) expect(result.value).toEqual(order)
      else fail()
    })
  })
})
