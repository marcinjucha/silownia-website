import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"
import { Mail } from "lucide-react"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "The variant of the button",
      defaultValue: "default",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "The size of the button",
      defaultValue: "default",
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
  },
  render: ({ variant, size }) => (
    <Button variant={variant} size={size}>
      Button
    </Button>
  ),
}

export const WithIcon: Story = {
  args: {
    variant: "default",
    size: "default",
  },
  render: ({ variant, size }) => (
    <Button variant={variant} size={size}>
      <Mail className="mr-2 h-4 w-4" />
      Login with Email
    </Button>
  ),
}

export const IconOnly: Story = {
  args: {
    variant: "default",
    size: "icon",
  },
  render: ({ variant, size }) => (
    <Button variant={variant} size={size}>
      <Mail className="h-4 w-4" />
    </Button>
  ),
}

export const AsLink: Story = {
  args: {
    variant: "link",
    size: "default",
  },
  render: ({ variant, size }) => (
    <Button variant={variant} size={size}>
      Link Button
    </Button>
  ),
}

export const Disabled: Story = {
  args: {
    variant: "default",
    size: "default",
  },
  render: ({ variant, size }) => (
    <Button variant={variant} size={size} disabled>
      Disabled
    </Button>
  ),
}
