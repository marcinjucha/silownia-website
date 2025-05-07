import { ImageControlDTO } from "@/components/controls/image"
import { TextControlDTO } from "@/components/controls/text"

export type SliderItemDTO = {
  link: string
  image: ImageControlDTO
}

export type SliderDTO = {
  title: TextControlDTO
  sliderItem: SliderItemDTO[]
}
