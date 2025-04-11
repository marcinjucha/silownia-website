"use client"
import RichText from "@/components/controls/rich-text"
import { LegalDTO } from "@/features/legal/logic/legal-type"

type Props = {
  data: LegalDTO
}

export default function LegacyContentRenderer({ data }: Props) {
  const { title, description, content } = data

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="mb-4 text-center text-4xl font-bold">{title}</h1>
      {description && <h2 className="mb-6 text-3xl font-bold">{description}</h2>}
      <div className="center max-w-4xl leading-relaxed">
        <RichText text={content} />
      </div>
    </div>
  )
}
