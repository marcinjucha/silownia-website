import { cacheLife, cacheTag } from "next/cache"
import { gql } from "@apollo/client"
import { TextControlDTO, TextControlFields } from "@/components/controls/text"
import { graphqlFetch } from "@/lib/graph-ql/fetch-client"
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
  "use cache"
  cacheLife("days") // 24h
  cacheTag("slider")
  cacheTag("layout")

  const data = await graphqlFetch<SliderResponse>(sliderQuery)

  return {
    title: data.slider.title,
    sliderItem: data.slider.sliderItem.map(item => ({
      link: item.link,
      image: item.image,
    })),
  }
}
