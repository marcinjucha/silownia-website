"use client"

import type { Meta, StoryObj } from "@storybook/react"
import RichTextControl, { RichTextContent } from "./rich-text"

const meta: Meta<typeof RichTextControl> = {
  title: "Controls/RichText",
  component: RichTextControl,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof RichTextControl>

const sampleContent: RichTextContent = [
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
    type: "heading",
    level: 3,
    children: [{ type: "text", text: "Sample Heading 3" }],
  },
  {
    type: "heading",
    level: 4,
    children: [{ type: "text", text: "Sample Heading 4" }],
  },
  {
    type: "heading",
    level: 5,
    children: [{ type: "text", text: "Sample Heading 5" }],
  },
  {
    type: "heading",
    level: 6,
    children: [{ type: "text", text: "Sample Heading 6" }],
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
  {
    type: "list",
    format: "ordered",
    children: [
      { type: "list-item", children: [{ type: "text", text: "First item" }] },
      { type: "list-item", children: [{ type: "text", text: "Second item" }] },
      { type: "list-item", children: [{ type: "text", text: "Third item" }] },
    ],
  },
  {
    type: "list",
    format: "unordered",
    children: [
      { type: "list-item", children: [{ type: "text", text: "Bullet point 1" }] },
      { type: "list-item", children: [{ type: "text", text: "Bullet point 2" }] },
      { type: "list-item", children: [{ type: "text", text: "Bullet point 3" }] },
    ],
  },
  {
    type: "quote",
    children: [
      { type: "text", text: "This is a sample quote block. It can contain " },
      { type: "text", text: "formatted", bold: true },
      { type: "text", text: " text too." },
    ],
  },
  {
    type: "code",
    children: [
      {
        type: "text",
        text: "// This is a code block\nfunction helloWorld() {\n  console.log('Hello, world!');\n}",
      },
    ],
  },
  {
    type: "image",
    image: {
      name: "sample-image.jpg",
      alternativeText: "Sample image description",
      url: "https://placehold.co/600x400",
      caption: "Sample image caption",
      width: 600,
      height: 400,
      hash: "sample_hash",
      ext: ".jpg",
      mime: "image/jpeg",
      size: 12345,
      provider: "local",
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
    },
    children: [{ type: "text", text: "" }],
  },
]

export const Default: Story = {
  args: {
    text: sampleContent,
  },
}

export const HeadingsOnly: Story = {
  args: {
    text: sampleContent.filter(block => block.type === "heading"),
  },
}

export const QuoteWithFormattedText: Story = {
  args: {
    text: [
      {
        type: "heading",
        level: 2,
        children: [{ type: "text", text: "Quote Example" }],
      },
      {
        type: "quote",
        children: [
          { type: "text", text: "This is a " },
          { type: "text", text: "formatted quote", bold: true },
          { type: "text", text: " with a " },
          {
            type: "link",
            url: "https://example.com",
            children: [{ type: "text", text: "link", italic: true }],
          },
          { type: "text", text: " inside." },
        ],
      },
    ],
  },
}

export const CodeBlockExample: Story = {
  args: {
    text: [
      {
        type: "heading",
        level: 2,
        children: [{ type: "text", text: "Code Block Example" }],
      },
      {
        type: "code",
        children: [
          {
            type: "text",
            text: `// TypeScript example
import React from 'react';

interface Props {
  name: string;
}

const Greeting: React.FC<Props> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Greeting;`,
          },
        ],
      },
    ],
  },
}

export const ImagesWithCaptions: Story = {
  args: {
    text: [
      {
        type: "heading",
        level: 2,
        children: [{ type: "text", text: "Images Example" }],
      },
      {
        type: "paragraph",
        children: [{ type: "text", text: "Below is an example of an image with a caption:" }],
      },
      {
        type: "image",
        image: {
          name: "image-with-caption.jpg",
          alternativeText: "A descriptive alt text",
          url: "https://placehold.co/800x400/e91e63/ffffff?text=Image+With+Caption",
          caption: "This is a sample image caption that appears below the image",
          width: 800,
          height: 400,
          hash: "image_with_caption_hash",
          ext: ".jpg",
          mime: "image/jpeg",
          size: 54321,
          provider: "local",
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
        },
        children: [{ type: "text", text: "" }],
      },
      {
        type: "paragraph",
        children: [{ type: "text", text: "And here's an image without a caption:" }],
      },
      {
        type: "image",
        image: {
          name: "image-without-caption.jpg",
          alternativeText: "Another descriptive alt text",
          url: "https://placehold.co/800x400/3f51b5/ffffff?text=No+Caption",
          caption: null,
          width: 800,
          height: 400,
          hash: "image_without_caption_hash",
          ext: ".jpg",
          mime: "image/jpeg",
          size: 65432,
          provider: "local",
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
        },
        children: [{ type: "text", text: "" }],
      },
    ],
  },
}

export const ComplexNestedLists: Story = {
  args: {
    text: [
      {
        type: "heading",
        level: 2,
        children: [{ type: "text", text: "Complex Nested Lists" }],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "First level item with sub-items (note: browser rendering may vary)",
              },
            ],
          },
          { type: "list-item", children: [{ type: "text", text: "Second level item 1" }] },
          { type: "list-item", children: [{ type: "text", text: "Second level item 2" }] },
          {
            type: "list-item",
            children: [{ type: "text", text: "Second level item with formatting", bold: true }],
          },
          { type: "list-item", children: [{ type: "text", text: "Another first level item" }] },
          {
            type: "list-item",
            children: [{ type: "text", text: "First level item with formatting", italic: true }],
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Note: True nested lists may require custom rendering logic depending on your renderer implementation.",
          },
        ],
      },
    ],
  },
}

export const MixedContent: Story = {
  args: {
    text: [
      {
        type: "heading",
        level: 1,
        children: [{ type: "text", text: "Mixed Content Document" }],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "This example shows a mix of all possible block types in a single document. It demonstrates how different elements flow together.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [{ type: "text", text: "Text Formatting" }],
      },
      {
        type: "paragraph",
        children: [
          { type: "text", text: "Text can be " },
          { type: "text", text: "bold", bold: true },
          { type: "text", text: ", " },
          { type: "text", text: "italic", italic: true },
          { type: "text", text: ", or " },
          { type: "text", text: "both bold and italic", bold: true, italic: true },
          { type: "text", text: "." },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [{ type: "text", text: "Quotes and Code" }],
      },
      {
        type: "quote",
        children: [
          {
            type: "text",
            text: "The future belongs to those who believe in the beauty of their dreams.",
          },
          { type: "text", text: " - Eleanor Roosevelt" },
        ],
      },
      {
        type: "code",
        children: [
          {
            type: "text",
            text: "// A simple React component\nconst Button = ({ text, onClick }) => (\n  <button onClick={onClick}>{text}</button>\n);",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [{ type: "text", text: "Lists" }],
      },
      {
        type: "list",
        format: "ordered",
        children: [
          { type: "list-item", children: [{ type: "text", text: "First ordered item" }] },
          { type: "list-item", children: [{ type: "text", text: "Second ordered item" }] },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          { type: "list-item", children: [{ type: "text", text: "First bullet item" }] },
          { type: "list-item", children: [{ type: "text", text: "Second bullet item" }] },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [{ type: "text", text: "Image Example" }],
      },
      {
        type: "image",
        image: {
          name: "mixed-content-image.jpg",
          alternativeText: "Sample image in mixed content",
          url: "https://placehold.co/800x400/009688/ffffff?text=Mixed+Content+Image",
          caption: "An image within a mixed content document",
          width: 800,
          height: 400,
          hash: "mixed_content_image_hash",
          ext: ".jpg",
          mime: "image/jpeg",
          size: 43210,
          provider: "local",
          createdAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
        },
        children: [{ type: "text", text: "" }],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "That's all for this mixed content example. You can also include ",
          },
          {
            type: "link",
            url: "https://example.com/rich-text",
            children: [{ type: "text", text: "links to external resources", bold: true }],
          },
          { type: "text", text: "." },
        ],
      },
    ],
  },
}

export const TextCombinations: Story = {
  args: {
    text: [
      {
        type: "heading",
        level: 2,
        children: [{ type: "text", text: "Text Styling Combinations" }],
      },
      {
        type: "paragraph",
        children: [
          { type: "text", text: "Normal text, " },
          { type: "text", text: "bold text", bold: true },
          { type: "text", text: ", " },
          { type: "text", text: "italic text", italic: true },
          { type: "text", text: ", and " },
          { type: "text", text: "bold italic text", bold: true, italic: true },
          { type: "text", text: "." },
        ],
      },
      {
        type: "paragraph",
        children: [
          { type: "text", text: "Links can also have styling: " },
          {
            type: "link",
            url: "https://example.com/plain",
            children: [{ type: "text", text: "plain link" }],
          },
          { type: "text", text: ", " },
          {
            type: "link",
            url: "https://example.com/bold",
            children: [{ type: "text", text: "bold link", bold: true }],
          },
          { type: "text", text: ", " },
          {
            type: "link",
            url: "https://example.com/italic",
            children: [{ type: "text", text: "italic link", italic: true }],
          },
          { type: "text", text: ", " },
          {
            type: "link",
            url: "https://example.com/bold-italic",
            children: [{ type: "text", text: "bold italic link", bold: true, italic: true }],
          },
          { type: "text", text: "." },
        ],
      },
    ],
  },
}
