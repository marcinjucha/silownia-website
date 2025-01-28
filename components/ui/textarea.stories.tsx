import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Czy textarea jest wyłączona",
    },
    placeholder: {
      control: "text",
      description: "Tekst placeholdera",
    },
    rows: {
      control: "number",
      description: "Liczba wierszy",
    },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    placeholder: "Wpisz dłuższy tekst...",
    rows: 4,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Textarea wyłączona",
    rows: 4,
  },
}
