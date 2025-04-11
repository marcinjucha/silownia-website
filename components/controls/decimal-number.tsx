import { gql } from "@apollo/client"
import TextControl from "@/components/controls/text"
import { FontStyleControlFields, FontStyleProps } from "@/components/controls/style"

export const DecimalNumberControlFields = gql`
  fragment DecimalNumberControlFields on ComponentControlsDecimalNumber {
    __typename
    value
    decimalPlaces
    currency
    style {
      ...FontStyleControlFields
    }
  }
  ${FontStyleControlFields}
`

export type Currency = "PLN" | "EUR" | "USD"

export type DecimalNumberDTO = {
  value: number
  decimalPlaces: number
  currency?: Currency
  style: FontStyleProps
}

export type DecimalNumberProps = {
  value: number
  decimalPlaces: number
  currency?: Currency
  style: FontStyleProps
}

export function mapToDecimalNumberProps(dto: DecimalNumberDTO): DecimalNumberProps {
  return {
    value: dto.value,
    decimalPlaces: dto.decimalPlaces,
    currency: dto.currency,
    style: dto.style,
  }
}

export default function DecimalNumberControl({
  value,
  decimalPlaces,
  currency,
  style,
}: DecimalNumberProps) {
  const formatOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }

  if (currency) {
    formatOptions.style = "currency"
    formatOptions.currency = currency
  }

  const formattedValue = new Intl.NumberFormat("pl-PL", formatOptions).format(value)

  return <TextControl text={formattedValue} style={style} />
}
