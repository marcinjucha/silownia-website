import type { Meta, StoryObj } from "@storybook/react"
import { ButtonControl } from "./button"

const meta = {
  title: "Controls/Button",
  component: ButtonControl,
  parameters: {
    layout: "centered",
  },
  args: {
    text: "Button",
    variant: "default",
    size: "default",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "The visual style of the button",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "The size of the button",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    text: {
      control: "text",
      description: "The text content of the button",
    },
    icon: {
      control: "object",
      description: "Optional icon configuration",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonControl>

export default meta
type Story = StoryObj<typeof meta>

const mockIcon = {
  alt: "Icon",
  imageFormat: "thumbnail" as const,
  image: {
    url: "https://placehold.co/30x30",
    height: 24,
    width: 24,
  },
}

export const Default: Story = {
  args: {
    text: "Click me",
  },
}

export const WithIcon: Story = {
  args: {
    text: "With Icon",
    icon: mockIcon,
  },
}

export const Destructive: Story = {
  args: {
    text: "Delete",
    variant: "destructive",
    icon: mockIcon,
  },
}

export const Outline: Story = {
  args: {
    text: "Outline",
    variant: "outline",
  },
}

export const Secondary: Story = {
  args: {
    text: "Secondary",
    variant: "secondary",
  },
}

export const Ghost: Story = {
  args: {
    text: "Ghost",
    variant: "ghost",
  },
}

export const Link: Story = {
  args: {
    text: "Link",
    variant: "link",
  },
}

export const Small: Story = {
  args: {
    text: "Small",
    size: "sm",
  },
}

export const Large: Story = {
  args: {
    text: "Large",
    size: "lg",
  },
}

export const IconOnly: Story = {
  args: {
    text: "",
    size: "icon",
    icon: mockIcon,
  },
}

export const AllVariants: Story = {
  args: {
    size: "default",
  },
  render: args => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <ButtonControl {...args} text="Default" variant="default" />
        <ButtonControl {...args} text="Destructive" variant="destructive" />
        <ButtonControl {...args} text="Outline" variant="outline" />
      </div>
      <div className="flex gap-4">
        <ButtonControl {...args} text="Secondary" variant="secondary" />
        <ButtonControl {...args} text="Ghost" variant="ghost" />
        <ButtonControl {...args} text="Link" variant="link" />
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  args: {
    variant: "default",
  },
  render: args => (
    <div className="flex items-center gap-4">
      <ButtonControl {...args} text="Small" size="sm" />
      <ButtonControl {...args} text="Default" size="default" />
      <ButtonControl {...args} text="Large" size="lg" />
      <ButtonControl {...args} text="" size="icon" icon={mockIcon} />
    </div>
  ),
}
