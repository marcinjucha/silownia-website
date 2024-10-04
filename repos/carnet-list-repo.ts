import { Item } from "@radix-ui/react-accordion"

export type CarnetDTO = {
  id: number
  title: string
  description?: string
  price?: number
  carnetOptions?: {
    placeholder: string
    options: {
      id: number
      title: string
      description: string
      price: number
    }[]
  }
  image?: {
    alternativeText: string
    width: number
    height: number
    mime: string
    url: string
    previewUrl?: string
  }
}

const CMS_BASE_URL = process.env.CMS_BASE_URL
const CMS_API_KEY = process.env.CMS_API_KEY

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
      }[]
      image?: {
        alternativeText: string
        width: number
        height: number
        mime: string
        url: string
        previewUrl?: string
      }
    },
  ]
}

export async function fetchCarnetListFromCMS(): Promise<CarnetDTO[]> {
  const json: CarnetListResponse = await fetch(
    `${CMS_BASE_URL}/api/carnets?populate[0]=carnetOptions&populate[1]=image`,
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
          options: item.carnetOptions,
        },
      }
    }

    if (item.image) {
      dto = { ...dto, image: item.image }
    }

    return dto
  })
}
