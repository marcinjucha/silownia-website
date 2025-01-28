import type { Meta, StoryObj } from "@storybook/react"
import ImageCarousel from "./image-carousel"

const meta: Meta<typeof ImageCarousel> = {
  title: "Components/ImageCarousel",
  component: ImageCarousel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof ImageCarousel>

const mockImages = [
  {
    url: "https://picsum.photos/800/600",
    alt: "Sample image 1",
    width: 800,
    height: 600,
  },
  {
    url: "https://picsum.photos/800/600",
    alt: "Sample image 2",
    width: 800,
    height: 600,
  },
]

export const Default: Story = {
  args: {
    images: mockImages,
  },
}
