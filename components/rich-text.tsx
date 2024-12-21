"use client"

import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import { type BlocksContent } from "@strapi/blocks-react-renderer"
import Link from "next/link"

export type LegalContentDTO = BlocksContent

type RichTextProps = {
  content: LegalContentDTO
}

export default function RichText({ content }: RichTextProps) {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => <p>{children}</p>,
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return <h1 className="text-4xl font-bold">{children}</h1>
            case 2:
              return <h2 className="text-3xl font-bold">{children}</h2>
            default:
              return <h3>{children}</h3>
          }
        },
        link: ({ children, url }) => <Link href={url}>{children}</Link>,
      }}
      modifiers={{
        bold: ({ children }: { children: React.ReactNode }) => <strong>{children}</strong>,
        italic: ({ children }: { children: React.ReactNode }) => <em>{children}</em>,
      }}
    />
  )
}
