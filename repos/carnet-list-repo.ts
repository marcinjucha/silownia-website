import { Item } from "@radix-ui/react-accordion"

export type CarnetOptionDTO = {
  id: number
  title: string
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
export type CarnetDTO = {
  id: number
  title: string
  description?: string
  price?: number
  carnetOptions?: {
    placeholder: string
    options: CarnetOptionDTO[]
  }
}

const CMS_BASE_URL = process.env.CMS_BASE_URL
const CMS_API_KEY = process.env.CMS_API_KEY

type CarnetImageResponse = {
  alternativeText: string
  width: number
  height: number
  mime: string
  url: string
  previewUrl?: string
}

type CarnetListResponse = {
  data: [
    {
      id: number
      title: string
      description?: string
      price?: number
      carnetOptionsPlaceholder?: string
      carnetOptions?: {
        id: number
        title: string
        description: string
        price: number
        image?: CarnetImageResponse
      }[]
    },
  ]
}

export async function fetchCarnetListFromCMS(): Promise<CarnetDTO[]> {
  const json: CarnetListResponse = await fetch(
    `${CMS_BASE_URL}/api/carnets?populate[0]=carnetOptions&populate[1]=carnetOptions.image`,
    {
      headers: {
        Authorization: `Bearer ${CMS_API_KEY}`,
      },
      cache: "no-cache",
    },
  ).then(res => res.json())

  return json.data.map(item => {
    let dto: CarnetDTO = {
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
    }

    if (item.carnetOptionsPlaceholder && item.carnetOptions) {
      dto = {
        ...dto,
        carnetOptions: {
          placeholder: item.carnetOptionsPlaceholder,
          options: item.carnetOptions.map(option => ({
            ...option,
            image: cmsImageDTO(option.image),
          })),
        },
      }
    }

    return dto
  })
}

function cmsImageDTO(image?: CarnetImageResponse): CarnetImageResponse | undefined {
  if (image) {
    return {
      ...image,
      url: `${CMS_BASE_URL}${image.url}`,
      previewUrl: image.previewUrl ? `${CMS_BASE_URL}${image.previewUrl}` : undefined,
    }
  }
  return undefined
}
