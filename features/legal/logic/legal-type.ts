import { RichTextControlContentDTO } from "@/components/controls/rich-text-repo"

export type LegalDTO = {
  title: string
  description?: string
  content: RichTextControlContentDTO
}
