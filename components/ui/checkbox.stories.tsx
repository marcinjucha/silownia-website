import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "./checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    id: "terms",
  },
}

export const Checked: Story = {
  args: {
    id: "terms",
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    id: "terms",
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    id: "terms",
    disabled: true,
    checked: true,
  },
}

export const WithLabel: Story = {
  render: args => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <label
        htmlFor="terms"
        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Akceptuję warunki
      </label>
    </div>
  ),
}
