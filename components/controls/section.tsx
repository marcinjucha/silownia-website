import { ReactNode } from "react"
import { gql } from "@apollo/client"
import { cn } from "@/lib/utils"
import TextControl, {
  TextControlDTO,
  mapToTextProps,
  TextControlFields,
  TextProps,
} from "@/components/controls/text"

export const SectionControlFields = gql`
  fragment SectionControlFields on ComponentControlsSection {
    __typename
    maxColumns
    title {
      ...TextControlFields
    }
  }
  ${TextControlFields}
`

export type SectionControlDTO = {
  maxColumns: number
  title: TextControlDTO
}

export type SectionProps = {
  children: ReactNode
  maxColumns: number
  title: TextProps
  className?: string
}

export function mapToSectionProps(dto: SectionControlDTO): Omit<SectionProps, "children"> {
  return {
    maxColumns: dto.maxColumns,
    title: mapToTextProps(dto.title),
  }
}

export default function SectionControl({
  children,
  maxColumns,
  title,
  className = "",
}: SectionProps) {
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
  }

  const limitedMaxColumns = Math.min(Math.max(1, maxColumns), 6) as keyof typeof gridClasses

  return (
    <section className={className}>
      <TextControl {...mapToTextProps(title)} />
      <div className={cn("mt-6 grid gap-4", gridClasses[limitedMaxColumns])}>{children}</div>
    </section>
  )
}
