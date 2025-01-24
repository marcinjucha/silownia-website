import type { Meta, StoryObj } from "@storybook/react"
import ImageText from "./image-text"

const meta: Meta<typeof ImageText> = {
  title: "Components/ImageText",
  component: ImageText,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof ImageText>

const mockImage = {
  url: "https://picsum.photos/800/600",
  alt: "Sample image",
  width: 800,
  height: 600,
}

export const Default: Story = {
  args: {
    title: "Example Title",
    subtitle: "Example Subtitle",
    description: "This is a sample description that demonstrates the ImageText component.",
    image: mockImage,
    buttonLabel: "Learn More",
    linkUrl: "/example",
    reverse: false,
  },
}

export const Reversed: Story = {
  args: {
    ...Default.args,
    reverse: true,
  },
}

export const WithoutButton: Story = {
  args: {
    title: "No Button Example",
    subtitle: "Example Without Button",
    description: "This example shows the component without a button.",
    image: mockImage,
  },
}
