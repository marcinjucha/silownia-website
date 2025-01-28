import type { Meta, StoryObj } from "@storybook/react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Wybierz opcję" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Opcja 1</SelectItem>
        <SelectItem value="option2">Opcja 2</SelectItem>
        <SelectItem value="option3">Opcja 3</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select wyłączony" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Opcja 1</SelectItem>
        <SelectItem value="option2">Opcja 2</SelectItem>
      </SelectContent>
    </Select>
  ),
}
