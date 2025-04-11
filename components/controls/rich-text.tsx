"use client"

import { RichTextControlDTO } from "@/components/controls/rich-text-repo"
import { type BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"
import Link from "next/link"

export type RichTextProps = {
  text: RichTextContent
}

export type RichTextContent = BlocksContent

export function mapToRichTextProps(dto: RichTextControlDTO): RichTextProps {
  return { ...dto }
}

export function RichTextControl({ text }: RichTextProps) {
  return (
    <BlocksRenderer
      content={text}
      blocks={{
        paragraph: ({ children }) => <p>{children}</p>,
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return <h1 className="text-6xl font-bold">{children}</h1>
            case 2:
              return <h2 className="text-5xl font-bold">{children}</h2>
            case 3:
              return <h3 className="text-4xl font-bold">{children}</h3>
            case 4:
              return <h4 className="text-2xl font-bold">{children}</h4>
            case 5:
              return <h5 className="text-xl font-bold">{children}</h5>
            default:
              return <h6>{children}</h6>
          }
        },
        link: ({ children, url }) => <Link href={url}>{children}</Link>,
        quote: ({ children }) => (
          <blockquote className="my-4 border-l-4 border-gray-400 pl-4 italic">
            {children}
          </blockquote>
        ),
        list: ({ children, format }) => {
          return format === "ordered" ? (
            <ol className="list-inside list-decimal">{children}</ol>
          ) : (
            <ul className="list-inside list-disc">{children}</ul>
          )
        },
        "list-item": ({ children }) => <li className="ml-4">{children}</li>,
      }}
      modifiers={{
        bold: ({ children }) => <strong>{children}</strong>,
        italic: ({ children }) => <em>{children}</em>,
      }}
    />
  )
}

export default RichTextControl
