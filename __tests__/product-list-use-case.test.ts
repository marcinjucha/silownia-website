import { clone } from "@/lib/utils"
import { ProductDTO } from "@/repos/product-list-repo"
import { fetchProductListUseCase } from "@/use-cases/product-list-use-case"

describe("Product list use case", () => {
  const dtos = [
    {
      id: 1,
      title: "t1",
      description: "d1",
      price: 100,
    },
    {
      id: 2,
      title: "t2",
      description: "d2",
      productOptions: {
        placeholder: "product options placeholder",
        options: [
          {
            id: 1,
            description: "co-d1",
            title: "co-t1",
            name: "co-n1",
            price: 200,
            image: {
              alternativeText: "image alt text",
              height: 100,
              width: 100,
              mime: "mime",
              url: "/upload/image-1",
              previewUrl: "/upload/image-preview-1",
            },
          },
        ],
      },
    },
  ] satisfies ProductDTO[]

  describe("fetch", () => {
    it("should return list with products", async () => {
      const fetch = jest.fn().mockReturnValue(clone(dtos))

      const result = await fetchProductListUseCase({ fetch })

      if (result.success) expect(result.value).toEqual(dtos)
      else fail()
    })

    it("should return empty list when error is thrown", async () => {
      const msg = "Response error"
      const fetch = () => {
        throw new Error(msg)
      }

      const result = await fetchProductListUseCase({ fetch })

      if (result.success) fail()
      else expect(result.error.message).toEqual(msg)
    })
  })
})
