import { TextControlDTO, TextControlFields } from "@/components/controls/text"
import client, { gql } from "@/lib/graph-ql/client"
import { handleGraphQLQuery } from "@/lib/graph-ql/graphql-utils"
import { ImageControlDTO, ImageControlFields } from "@/components/controls/image"
import { SliderDTO } from "./slider-type"

export const sliderQuery = gql`
  query GetSlider {
    slider {
      title {
        ...TextControlFields
      }
      sliderItem {
        link
        image {
          ...ImageControlFields
        }
      }
    }
  }
  ${TextControlFields}
  ${ImageControlFields}
`

type SliderResponse = {
  slider: {
    title: TextControlDTO
    sliderItem: {
      link: string
      image: ImageControlDTO
    }[]
  }
}

export async function fetchSliderFromCms(): Promise<SliderDTO> {
  const result = await client.query<SliderResponse>({
    query: sliderQuery,
  })

  const data = handleGraphQLQuery(result).slider

  return {
    title: data.title,
    sliderItem: data.sliderItem.map(item => ({
      link: item.link,
      image: item.image,
    })),
  }
}
