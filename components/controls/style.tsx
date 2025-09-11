import { gql } from "@apollo/client"

export const FontStyleControlFields = gql`
  fragment FontStyleControlFields on ComponentControlsFontStyle {
    __typename
    fontSize
    fontWeight
  }
`

export type FontSize =
  | "text-xs"
  | "text-sm"
  | "text-base"
  | "text-lg"
  | "text-xl"
  | "text-2xl"
  | "text-3xl"
  | "text-4xl"
  | "text-5xl"
  | "text-6xl"
  | "text-7xl"
  | "text-8xl"
  | "text-9xl"

export type FontWeight =
  | "font-thin"
  | "font-extralight"
  | "font-light"
  | "font-normal"
  | "font-medium"
  | "font-semibold"
  | "font-bold"
  | "font-extrabold"
  | "font-black"

export type FontStyleDTO = {
  fontSize?: FontSize
  fontWeight?: FontWeight
}

export type FontStyleProps = FontStyleDTO
export type FontStyleResponse = FontStyleDTO
