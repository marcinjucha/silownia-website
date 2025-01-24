import type { Meta, StoryObj } from "@storybook/react"
import ImageWithButton from "./image-with-button"

const meta: Meta<typeof ImageWithButton> = {
  title: "Components/ImageWithButton",
  component: ImageWithButton,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof ImageWithButton>

const mockImage = {
  url: "https://picsum.photos/1920/1080",
  alt: "Hero image",
  width: 1920,
  height: 1080,
}

export const Default: Story = {
  args: {
    title: "Welcome to Our Website",
    buttonLabel: "Get Started",
    image: mockImage,
    linkUrl: "/start",
  },
}

export const WithoutTitle: Story = {
  args: {
    buttonLabel: "Explore Now",
    image: mockImage,
    linkUrl: "/explore",
  },
}
