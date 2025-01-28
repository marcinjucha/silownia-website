import type { Meta, StoryObj } from "@storybook/react"
import { Label } from "./label"

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: () => <Label>Default Label</Label>,
}

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        className="rounded border p-2"
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled" className="opacity-50">
        Disabled Label
      </Label>
      <input type="text" id="disabled" disabled className="rounded border p-2 opacity-50" />
    </div>
  ),
}
