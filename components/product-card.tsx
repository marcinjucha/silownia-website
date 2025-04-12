import {
  ButtonControl,
  ButtonControlFields,
  ButtonDTO,
  ButtonProps,
  mapToButtonProps,
} from "@/components/controls/button"
import DecimalNumberControl, {
  DecimalNumberControlFields,
  DecimalNumberDTO,
  DecimalNumberProps,
  mapToDecimalNumberProps,
} from "@/components/controls/decimal-number"
import {
  ImageControl,
  ImageControlFields,
  ImageControlDTO,
  ImageProps,
  mapToImageProps,
} from "@/components/controls/image"
import TextControl, {
  TextControlFields,
  TextControlDTO,
  TextProps,
  mapToTextProps,
} from "@/components/controls/text"
import { cn } from "@/lib/utils"
import { gql } from "@apollo/client"

export const ProductCardComponentFields = gql`
  fragment ProductCardComponentFields on ComponentComponentsProductCard {
    __typename
    image {
      ...ImageControlFields
    }
    title {
      ...TextControlFields
    }
    price {
      ...DecimalNumberControlFields
    }
    button {
      ...ButtonControlFields
    }
  }
  ${ImageControlFields}
  ${TextControlFields}
  ${DecimalNumberControlFields}
  ${ButtonControlFields}
`

export type ProductCardDTO = {
  image: ImageControlDTO
  title: TextControlDTO
  price: DecimalNumberDTO
  button: ButtonDTO
}

export type ProductCardProps = {
  image: ImageProps
  title: TextProps
  price: DecimalNumberProps
  button: ButtonProps
  className?: string
  onButtonClick?: () => void
}

export function mapToProductCardProps(dto: ProductCardDTO): Omit<ProductCardProps, "className"> {
  return {
    image: mapToImageProps(dto.image),
    title: mapToTextProps(dto.title),
    price: mapToDecimalNumberProps(dto.price),
    button: mapToButtonProps(dto.button),
  }
}

export default function ProductCardComponent({
  image,
  title,
  price,
  button,
  className,
  onButtonClick,
}: ProductCardProps) {
  return (
    <div className={cn("bg-card flex flex-col overflow-hidden rounded-lg", className)}>
      <div className="relative flex items-center justify-center p-4">
        <ImageControl {...image} />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <TextControl {...title} className="text-center" />

        <div className="flex justify-center py-2">
          <DecimalNumberControl {...price} />
        </div>

        <div className="mt-4 flex justify-center">
          <ButtonControl {...button} onClick={onButtonClick} />
        </div>
      </div>
    </div>
  )
}
