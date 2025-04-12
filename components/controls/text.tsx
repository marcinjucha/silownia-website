import {
  FontSize,
  FontStyleProps,
  FontStyleControlFields,
  FontWeight,
} from "@/components/controls/style"
import { cn } from "@/lib/utils"
import { gql } from "@apollo/client"
import { ElementType } from "react"

export const TextControlFields = gql`
  fragment TextControlFields on ComponentControlsText {
    __typename
    text
    style {
      ...FontStyleControlFields
    }
  }
  ${FontStyleControlFields}
`

export type TextControlDTO = {
  text: string
  style: FontStyleProps
}

const fontSizeToElement: Record<FontSize, ElementType> = {
  "text-xs": "small",
  "text-sm": "p",
  "text-base": "p",
  "text-lg": "p",
  "text-xl": "p",
  "text-2xl": "p",
  "text-3xl": "p",
  "text-4xl": "h6",
  "text-5xl": "h5",
  "text-6xl": "h4",
  "text-7xl": "h3",
  "text-8xl": "h2",
  "text-9xl": "h1",
}

export type TextProps = {
  text: string
  style: FontStyleProps
  className?: string
}

export function mapToTextProps(dto: TextControlDTO): Omit<TextProps, "className"> {
  return {
    text: dto.text,
    style: dto.style,
  }
}

export default function TextControl({ text, style, className }: TextProps) {
  const fixedFontWeight = style.fontWeight?.replace(/_/g, "-") as FontWeight | undefined
  const fixedFontSize = style.fontSize?.replace(/_/g, "-") as FontSize | undefined
  const Element = fixedFontSize ? fontSizeToElement[fixedFontSize] : "p"

  return <Element className={cn(fixedFontSize, fixedFontWeight, className)}>{text}</Element>
}
