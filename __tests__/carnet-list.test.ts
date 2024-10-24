import { CarnetDTO } from "@/repos/carnet-list-repo"
import { fetchCarnetListUseCase } from "@/use-cases/carnet-list-use-case"
import cloneDeep from "lodash/cloneDeep"

describe("Fetch carnet list", () => {
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
      carnetOptions: {
        placeholder: "carnet options placeholder",
        options: [
          {
            id: 1,
            description: "co-d1",
            title: "co-t1",
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
  ] satisfies CarnetDTO[]

  it("should return list with carnets", async () => {
    const fetch = async () => cloneDeep(dtos)

    const result = await fetchCarnetListUseCase({ fetch })

    expect(result).toEqual(dtos)
  })

  it("should return empty list when error is thrown", async () => {
    const fetch = () => {
      throw new Error("Response error")
    }

    const result = await fetchCarnetListUseCase({ fetch })

    expect(result).toEqual([])
  })
})
