import type { Meta, StoryObj } from "@storybook/react"
import DecimalNumberControl from "./decimal-number"
import { FontSize, FontWeight } from "./style"
import ButtonControl, { ButtonVariant, ButtonSize } from "./button"

const meta: Meta<typeof DecimalNumberControl> = {
  title: "Controls/DecimalNumber",
  component: DecimalNumberControl,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Component for displaying decimal numbers with configurable formatting options, including currency support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "number",
      description: "The numeric value to display",
    },
    decimalPlaces: {
      control: { type: "number", min: 0, max: 10 },
      description: "Number of decimal places to display",
    },
    currency: {
      control: "select",
      options: ["PLN", "EUR", "USD", undefined],
      description: "Currency to display (optional)",
    },
    style: {
      control: "object",
      description: "Font styling options",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Lista wariantów przycisków
const buttonVariants: ButtonVariant[] = [
  "default",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
]

// Lista rozmiarów przycisków
const buttonSizes: ButtonSize[] = ["default", "sm", "lg", "icon"]

export const Default: Story = {
  args: {
    value: 123.45,
    decimalPlaces: 2,
    currency: "PLN",
    style: {
      fontSize: "text-xl",
      fontWeight: "font-normal",
    },
  },
}

export const Euro: Story = {
  args: {
    ...Default.args,
    currency: "EUR",
  },
}

export const USDollar: Story = {
  args: {
    ...Default.args,
    currency: "USD",
  },
}

export const NoCurrency: Story = {
  args: {
    ...Default.args,
    currency: undefined,
  },
}

export const LargeNumber: Story = {
  args: {
    value: 9876543.21,
    decimalPlaces: 2,
    currency: "PLN",
    style: {
      fontSize: "text-2xl",
      fontWeight: "font-bold",
    },
  },
}

export const NoDecimals: Story = {
  args: {
    value: 100,
    decimalPlaces: 0,
    currency: "PLN",
    style: {
      fontSize: "text-xl",
      fontWeight: "font-normal",
    },
  },
}

export const ManyDecimals: Story = {
  args: {
    value: 123.4567,
    decimalPlaces: 4,
    currency: "PLN",
    style: {
      fontSize: "text-lg",
      fontWeight: "font-medium",
    },
  },
}
