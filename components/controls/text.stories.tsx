import type { Meta, StoryObj } from "@storybook/react"
import TextControl from "./text"
import { FontSize, FontWeight } from "@/components/controls/style"

const fontSizes: FontSize[] = [
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
  "text-3xl",
  "text-4xl",
  "text-5xl",
  "text-6xl",
  "text-7xl",
  "text-8xl",
  "text-9xl",
]

const fontWeights: FontWeight[] = [
  "font-thin",
  "font-extralight",
  "font-light",
  "font-normal",
  "font-medium",
  "font-semibold",
  "font-bold",
  "font-extrabold",
  "font-black",
]

const meta = {
  title: "Controls/Text",
  component: TextControl,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Text component that supports different font sizes and weights and renders appropriate HTML elements.",
      },
    },
  },
  args: {
    text: "Sample text",
    style: {
      fontSize: "text-base",
      fontWeight: "font-normal",
    },
  },
  argTypes: {
    text: {
      control: "text",
      description: "The text content to display",
    },
    style: {
      control: "object",
      description: "Style properties for the text",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextControl>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: "This is a sample text",
    style: {
      fontSize: "text-base",
      fontWeight: "font-normal",
    },
  },
}

export const LongText: Story = {
  args: {
    text: "This is a longer text that demonstrates how the component handles multiple lines of content. It should wrap properly and maintain proper spacing.",
    style: {
      fontSize: "text-lg",
      fontWeight: "font-normal",
    },
  },
}

export const Heading: Story = {
  args: {
    text: "Large Heading",
    style: {
      fontSize: "text-4xl",
      fontWeight: "font-bold",
    },
  },
}

export const FontSizeComparison: Story = {
  args: {
    text: "The quick brown fox jumps over the lazy dog",
    style: {
      fontSize: "text-base",
      fontWeight: "font-normal",
    },
  },
  render: args => (
    <div className="flex flex-col gap-4">
      {fontSizes.map(size => (
        <TextControl
          key={size}
          text={`${size} - ${args.text}`}
          style={{
            fontSize: size,
            fontWeight: args.style.fontWeight,
          }}
        />
      ))}
    </div>
  ),
}

export const FontWeightComparison: Story = {
  args: {
    text: "The quick brown fox jumps over the lazy dog",
    style: {
      fontSize: "text-xl",
      fontWeight: "font-normal",
    },
  },
  render: args => (
    <div className="flex flex-col gap-4">
      {fontWeights.map(weight => (
        <TextControl
          key={weight}
          text={`${weight} - ${args.text}`}
          style={{
            fontSize: args.style.fontSize,
            fontWeight: weight,
          }}
        />
      ))}
    </div>
  ),
}

export const CombinedVariants: Story = {
  args: {
    text: "Sample text",
  },
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <TextControl text="Small Light" style={{ fontSize: "text-sm", fontWeight: "font-light" }} />
      <TextControl
        text="Medium Normal"
        style={{ fontSize: "text-base", fontWeight: "font-normal" }}
      />
      <TextControl text="Large Bold" style={{ fontSize: "text-lg", fontWeight: "font-bold" }} />
      <TextControl
        text="XL Semibold"
        style={{ fontSize: "text-xl", fontWeight: "font-semibold" }}
      />
      <TextControl text="2XL Black" style={{ fontSize: "text-2xl", fontWeight: "font-black" }} />
      <TextControl text="3XL Thin" style={{ fontSize: "text-3xl", fontWeight: "font-thin" }} />
    </div>
  ),
}
