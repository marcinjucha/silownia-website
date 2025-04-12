import { ImageFormat, ImageProps } from "@/components/controls/image"
import type { Meta, StoryObj } from "@storybook/react"
import ArticleCard from "./article-card"

const meta: Meta<typeof ArticleCard> = {
  title: "Components/ArticleCard",
  component: ArticleCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Article card component that displays an image, title, and a short description.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    image: { control: "object", description: "Image properties for the article" },
    title: { control: "object", description: "Title properties for the article" },
    text: { control: "object", description: "Text properties for the article" },
    className: { control: "text", description: "Additional CSS classes to apply to the component" },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleImage = {
  alt: "Article Image",
  imageFormat: "medium" as ImageFormat,
  image: {
    url: "https://picsum.photos/800/600",
    height: 300,
    width: 400,
    formats: {
      medium: {
        url: "/https://picsum.photos/800/600",
        height: 300,
        width: 400,
      },
    },
  },
} as ImageProps

export const Default: Story = {
  args: {
    image: sampleImage,
    title: {
      text: "AI in Modern Technology",
      style: {
        fontSize: "text-4xl",
        fontWeight: "font-semibold",
      },
    },
    text: {
      text: "Artificial intelligence is transforming industries, enabling automation and insights like never before.",
      style: {
        fontSize: "text-xl",
        fontWeight: "font-normal",
      },
    },
    className: "w-full",
  },
}

export const ReversedOnSm: Story = {
  args: {
    ...Default.args,
    reversed: true,
  },
}

export const LongText: Story = {
  args: {
    ...Default.args,
    text: {
      text: "AI is revolutionizing healthcare, finance, and many other industries. It has the potential to improve efficiency, accuracy, and decision-making. However, challenges such as bias, ethics, and security remain key concerns.",
      style: {
        fontSize: "text-base",
        fontWeight: "font-normal",
      },
    },
  },
}

export const SmallCard: Story = {
  args: {
    ...Default.args,
    className: "w-[450px]",
  },
}

export const LargeCard: Story = {
  args: {
    ...Default.args,
    className: "w-[600px]",
  },
}
