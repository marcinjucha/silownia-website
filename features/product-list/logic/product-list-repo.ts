import { ImageDTO } from "@/features/common/dtos"
import { cmsImageDTO, ImageResponse } from "@/features/common/repo"

export type ProductDTO = {
  id: number
  title: string
  note?: string
  content: (ProductComponentSelectOptionDTO | ProductComponentDetailsDTO)[]
}

export type ProductComponentSelectOptionDTO = {
  component: "product-select-option"
  placeholder: string
  options: ProductComponentDetailsDTO[]
}

export type ProductComponentDetailsDTO = {
  component: "product-details"
  id: number
  name?: string
  description?: string
  price: number
  image?: ImageDTO
}

export type ProductListResponse = {
  data: {
    id: number
    title: string
    note?: string
    content: ProductListContentResponse[]
  }[]
}

export type ProductListContentResponse =
  | ({
      __component: "product.product-option"
    } & ProductListSelectOptionResponse)
  | ({
      __component: "product.product-details"
    } & ProductListDetailsResponse)

export type ProductListDetailsResponse = {
  id: number
  name?: string
  description?: string
  price: number
  image?: ImageResponse
}

export type ProductListSelectOptionResponse = {
  placeholder: string
  details: ProductListDetailsResponse[]
}

const CMS_BASE_URL = process.env.CMS_BASE_URL
const CMS_API_KEY = process.env.CMS_API_KEY

export async function fetchProductListFromCMS(): Promise<ProductDTO[]> {
  const json: ProductListResponse = await fetch(`${CMS_BASE_URL}/api/products`, {
    headers: {
      Authorization: `Bearer ${CMS_API_KEY}`,
    },
    cache: "no-cache",
  }).then(res => res.json())

  return json.data.map(item => {
    let dto: ProductDTO = {
      id: item.id,
      title: item.title,
      note: item.note,
      content: [],
    }

    for (const content of item.content) {
      let comp: ProductComponentSelectOptionDTO | ProductComponentDetailsDTO
      if (content.__component === "product.product-option") {
        comp = {
          component: "product-select-option",
          placeholder: content.placeholder,
          options: content.details.map(item => ({
            id: item.id,
            price: item.price,
            description: item.description,
            name: item.name,
            component: "product-details",
            image: cmsImageDTO(item.image),
          })),
        } satisfies ProductComponentSelectOptionDTO
      }
      if (content.__component === "product.product-details") {
        comp = {
          id: content.id,
          price: content.price,
          description: content.description,
          name: content.name,
          component: "product-details",
          image: cmsImageDTO(content.image),
        } satisfies ProductComponentDetailsDTO
      }

      dto.content.push(comp!)
    }

    return dto
  })
}
