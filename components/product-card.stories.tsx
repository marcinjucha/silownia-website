import { ButtonSize, ButtonVariant } from "@/components/controls/button"
import { ImageFormat, ImageProps } from "@/components/controls/image"
import type { Meta, StoryObj } from "@storybook/react"
import ProductCardComponent from "./product-card"

const meta: Meta<typeof ProductCardComponent> = {
  title: "Components/ProductCard",
  component: ProductCardComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Product card component that displays product information including image, title, price, and an add to cart button.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    image: {
      control: "object",
      description: "Image properties for the product",
    },
    title: {
      control: "object",
      description: "Title properties for the product",
    },
    price: {
      control: "object",
      description: "Price properties for the product",
    },
    button: {
      control: "object",
      description: "Button properties for the add to cart action",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the component",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Przykładowe dane do użycia w stories
const sampleImage = {
  alt: "hAI Magazine",
  imageFormat: "medium" as ImageFormat,
  image: {
    url: "https://placehold.co/300x400",
    height: 400,
    width: 300,
    formats: {
      medium: {
        url: "https://placehold.co/300x400",
        height: 400,
        width: 300,
      },
    },
  },
} as ImageProps

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
    image: sampleImage,
    title: {
      text: "hAI Magazine 3/2024",
      style: {
        fontSize: "text-xl",
        fontWeight: "font-medium",
      },
    },
    price: {
      value: 35,
      decimalPlaces: 2,
      currency: "PLN",
      style: {
        fontSize: "text-lg",
        fontWeight: "font-normal",
      },
    },
    button: {
      variant: "default",
      size: "default",
      text: "DODAJ DO KOSZYKA",
    },
    className: "w-[300px]",
  },
}

export const WithIcon: Story = {
  args: {
    ...Default.args,
    button: {
      variant: "default",
      size: "default",
      text: "DODAJ DO KOSZYKA",
      icon: {
        alt: "Cart icon",
        imageFormat: "thumbnail" as ImageFormat,
        image: {
          url: "https://placehold.co/20x20",
          height: 20,
          width: 20,
          formats: {
            thumbnail: {
              url: "https://placehold.co/20x20",
              height: 20,
              width: 20,
            },
          },
        },
      } as ImageProps,
    },
  },
}

export const OutOfStock: Story = {
  args: {
    ...Default.args,
    button: {
      variant: "outline",
      size: "default",
      text: "PRODUKT NIEDOSTĘPNY",
    },
  },
}

export const WithoutCurrency: Story = {
  args: {
    ...Default.args,
    price: {
      value: 35,
      decimalPlaces: 2,
      style: {
        fontSize: "text-lg",
        fontWeight: "font-normal",
      },
    },
  },
}

export const ButtonVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {buttonVariants.map(variant => (
        <ProductCardComponent
          key={variant}
          image={sampleImage}
          title={{
            text: `Wariant: ${variant}`,
            style: {
              fontSize: "text-lg",
              fontWeight: "font-medium",
            },
          }}
          price={{
            value: 99.99,
            decimalPlaces: 2,
            currency: "PLN",
            style: {
              fontSize: "text-base",
              fontWeight: "font-normal",
            },
          }}
          button={{
            variant: variant,
            size: "default",
            text: variant.toUpperCase(),
          }}
          className="w-[220px]"
        />
      ))}
    </div>
  ),
}
