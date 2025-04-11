import type { Meta, StoryObj } from "@storybook/react"
import ArticleDetails, { ArticleDetailsProps } from "./article-details"
import { ImageFormat, ImageProps } from "@/components/controls/image"
import { TextProps } from "@/components/controls/text"
import { RichTextControlDTO } from "./controls/rich-text-repo"

const meta: Meta<ArticleDetailsProps> = {
  title: "Components/ArticleDetails",
  component: ArticleDetails,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Szczegóły artykułu: obrazek, tytuły, tekst i treść z edytora (RichText).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    reversed: {
      control: "boolean",
      description: "Czy odwrócić kolejność (obrazek po prawej, tekst po lewej).",
    },
    className: {
      control: "text",
      description: "Dodatkowe klasy CSS dla głównego wrappera.",
    },
  },
}

export default meta
type Story = StoryObj<ArticleDetailsProps>

const sampleImage: ImageProps = {
  alt: "Sample Article Image",
  imageFormat: "medium" as ImageFormat,
  image: {
    url: "https://picsum.photos/800/600",
    height: 600,
    width: 800,
    formats: {
      medium: {
        url: "/https://picsum.photos/800/600",
        height: 600,
        width: 800,
      },
    },
  },
}

const sampleTitle: TextProps = {
  text: "Tytuł artykułu",
  style: {
    fontSize: "text-3xl",
    fontWeight: "font-semibold",
  },
}

const sampleText: TextProps = {
  text: "Krótki opis treści artykułu.",
  style: {
    fontSize: "text-base",
    fontWeight: "font-normal",
  },
}

const sampleContent: RichTextControlDTO = {
  text: [
    {
      type: "paragraph",
      children: [
        {
          type: "text",
          text: "To jest przykładowy akapit w formacie RichText. Możesz w nim umieścić linki, pogrubienia itp.",
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      children: [
        {
          type: "text",
          text: "Przykładowy nagłówek H2",
        },
      ],
    },
    {
      type: "paragraph",
      children: [
        {
          type: "text",
          text: "To jest przykładowy akapit w formacie RichText. Możesz w nim umieścić linki, pogrubienia itp.",
        },
      ],
    },
    {
      type: "heading",
      level: 1,
      children: [
        {
          type: "text",
          text: "Wiekszy nagłówek level1: 1",
        },
      ],
    },
  ],
}

export const Default: Story = {
  args: {
    header: {
      image: sampleImage,
      title: sampleTitle,
      text: sampleText,
    },
    content: sampleContent,
    reversed: false,
    className: "w-full mx-auto",
  },
}

//   Wariant reversed - zdjecie po prawej

export const Reversed: Story = {
  args: {
    ...Default.args,
    reversed: true,
  },
}

// 70% width

export const Width70: Story = {
  args: {
    header: {
      image: {
        ...sampleImage,
        image: {
          ...sampleImage.image,
          url: "https://picsum.photos/1200/800",
          height: 800,
          width: 1200,
        },
      },
      title: sampleTitle,
      text: sampleText,
    },
    content: {
      text: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text:
                "Tutaj mamy dużo dłuższą przykładową treść. " +
                "Możemy opisywać szczegóły artykułu, wstawiać kolejne nagłówki, listy itd. ",
            },
          ],
        },
        {
          type: "heading",
          level: 2,
          children: [
            {
              type: "text",
              text: "Kolejny rozbudowany nagłówek",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text:
                "A tutaj jeszcze jeden akapit z ciekawym rozwinięciem tematu. " +
                "Można to dowolnie rozbudowywać. ",
            },
          ],
        },
      ],
    },
    className: "mx-auto w-[70%]",
  },
}
