export type ProductDTO = {
  id: number
  title: string
  description?: string
  price?: number
  productOptions?: {
    placeholder: string
    options: ProductOptionDTO[]
  }
}

export type ProductOptionDTO = {
  id: number
  title: string
  name: string
  description: string
  price: number
  image?: {
    alternativeText: string
    width: number
    height: number
    mime: string
    url: string
    previewUrl?: string
  }
}

type ProductImageResponse = {
  alternativeText: string
  width: number
  height: number
  mime: string
  url: string
  previewUrl?: string
}

type ProductListResponse = {
  data: [
    {
      id: number
      title: string
      description?: string
      price?: number
      productOptions?: {
        placeholder: string
        options: {
          id: number
          title: string
          name: string
          description: string
          price: number
          image?: ProductImageResponse
        }[]
      }
    },
  ]
}

const CMS_BASE_URL = process.env.CMS_BASE_URL
const CMS_API_KEY = process.env.CMS_API_KEY

export async function fetchProductListFromCMS(): Promise<ProductDTO[]> {
  const json: ProductListResponse = await fetch(
    `${CMS_BASE_URL}/api/products?populate=productOptions.options.image`,
    {
      headers: {
        Authorization: `Bearer ${CMS_API_KEY}`,
      },
      cache: "no-cache",
    },
  ).then(res => res.json())

  return json.data.map(item => {
    let dto: ProductDTO = {
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
    }

    if (item.productOptions) {
      dto = {
        ...dto,
        productOptions: {
          placeholder: item.productOptions.placeholder,
          options: item.productOptions.options.map(option => ({
            ...option,
            image: cmsImageDTO(option.image),
          })),
        },
      }
    }

    return dto
  })
}

function cmsImageDTO(image?: ProductImageResponse): ProductImageResponse | undefined {
  if (image) {
    return {
      ...image,
      url: `${CMS_BASE_URL}${image.url}`,
      previewUrl: image.previewUrl ? `${CMS_BASE_URL}${image.previewUrl}` : undefined,
    }
  }
  return undefined
}
