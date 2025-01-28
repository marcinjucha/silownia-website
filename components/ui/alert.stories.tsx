import type { Meta, StoryObj } from "@storybook/react"
import { Alert, AlertDescription, AlertTitle } from "./alert"
import { AlertTriangle } from "lucide-react"

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  parameters: {
    layout: "centered",
  },
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
      description: "The variant of the alert",
      defaultValue: "default",
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    variant: "default",
  },
  render: ({ variant }) => (
    <Alert variant={variant}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
}

export const WithIcon: Story = {
  args: {
    variant: "default",
  },
  render: ({ variant }) => (
    <Alert variant={variant}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Tips</AlertTitle>
      <AlertDescription>
        You can start editing the page by modifying pages/index.tsx
      </AlertDescription>
    </Alert>
  ),
}

export const TitleOnly: Story = {
  args: {
    variant: "default",
  },
  render: ({ variant }) => (
    <Alert variant={variant}>
      <AlertTitle>Success</AlertTitle>
    </Alert>
  ),
}

export const DescriptionOnly: Story = {
  args: {
    variant: "destructive",
  },
  render: ({ variant }) => (
    <Alert variant={variant}>
      <AlertDescription>Your changes have been successfully saved.</AlertDescription>
    </Alert>
  ),
}
