import { fetchProductListFromCMS } from "@/features/product-list/logic/product-list-repo"
import { fetchProductListUseCase } from "@/features/product-list/logic/product-list-use-case"
import { productDTOSample, productListResponseSample } from "@/lib/test-samples"
import fetchMock from "jest-fetch-mock"

describe("Product list use case", () => {
  const response = productListResponseSample()
  const dto = productDTOSample(response)

  beforeEach(() => {
    fetchMock.enableMocks()
  })

  describe("fetch", () => {
    it("should return list with products", async () => {
      fetchMock.mockResponseOnce(JSON.stringify(response))

      const result = await fetchProductListUseCase({ fetch: fetchProductListFromCMS })

      if (result.success) expect(result.value).toEqual(dto)
      else fail()
    })

    it("should return empty list when error is thrown", async () => {
      const msg = "Response error"

      fetchMock.mockRejectOnce(new Error(msg))

      const result = await fetchProductListUseCase({ fetch: fetchProductListFromCMS })

      if (result.success) fail()
      else expect(result.error.message).toEqual(msg)
    })
  })
})
