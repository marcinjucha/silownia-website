import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "ghost"],
      description: "Wariant stylu inputa",
    },
    disabled: {
      control: "boolean",
      description: "Czy input jest wyłączony",
    },
    placeholder: {
      control: "text",
      description: "Tekst placeholdera",
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: "Wprowadź tekst...",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    placeholder: "Ghost input...",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Input wyłączony",
  },
}
