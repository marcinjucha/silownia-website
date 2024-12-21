import { type LegalContentDTO } from "@/components/rich-text"

export type LegalDTO = {
  title: string
  description?: string
  content: LegalContentDTO
}
