import type { Meta, StoryObj } from "@storybook/react"
import SliderSection from "./slider"

const meta: Meta<typeof SliderSection> = {
  title: "Components/Slider",
  component: SliderSection,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Slider with recommendations or business partners",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "object", description: "Company name" },
    items: { control: "object", description: "Array of objects with image and title" },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const SliderBasic: Story = {
  args: {
    title: {
      text: "Our Partners",
      style: {
        fontSize: "text-xl",
        fontWeight: "font-semibold",
      },
    },
    items: [
      {
        link: "https://partner1.com",
        image: {
          alt: "Partner 1 Logo",
          imageFormat: "medium",
          image: {
            url: "https://placehold.co/150x80",
            height: 80,
            width: 150,
            formats: {
              medium: {
                url: "https://placehold.co/150x80",
                height: 80,
                width: 150,
              },
            },
          },
        },
      },
      {
        link: "https://partner2.com",
        image: {
          alt: "Partner 2 Logo",
          imageFormat: "medium",
          image: {
            url: "https://placehold.co/160x80",
            height: 80,
            width: 160,
            formats: {
              medium: {
                url: "https://placehold.co/160x80",
                height: 80,
                width: 160,
              },
            },
          },
        },
      },
    ],
  },
}
