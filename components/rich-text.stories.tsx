import type { Meta, StoryObj } from "@storybook/react"
import RichText, { LegalContentDTO } from "./rich-text"

const meta: Meta<typeof RichText> = {
  title: "Components/RichText",
  component: RichText,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof RichText>

const sampleContent: LegalContentDTO = [
  {
    type: "heading",
    level: 1,
    children: [{ type: "text", text: "Sample Heading 1" }],
  },
  {
    type: "paragraph",
    children: [
      { type: "text", text: "This is a sample paragraph with " },
      { type: "text", text: "bold", bold: true },
      { type: "text", text: " and " },
      { type: "text", text: "italic", italic: true },
      { type: "text", text: " text." },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ type: "text", text: "Sample Heading 2" }],
  },
  {
    type: "paragraph",
    children: [
      { type: "text", text: "Here's a paragraph with a " },
      {
        type: "link",
        url: "https://example.com",
        children: [{ type: "text", text: "sample link" }],
      },
      { type: "text", text: "." },
    ],
  },
]

export const Default: Story = {
  args: {
    content: sampleContent,
  },
}
