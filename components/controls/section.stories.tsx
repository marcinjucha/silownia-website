import SectionControl from "@/components/controls/section"
import { FontSize, FontWeight } from "@/components/controls/style"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof SectionControl> = {
  title: "Controls/Section",
  component: SectionControl,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "hsl(var(--background))" },
        { name: "light", value: "hsl(var(--foreground))" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    maxColumns: {
      control: { type: "range", min: 1, max: 6, step: 1 },
      description: "Maksymalna liczba kolumn w siatce",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "4" },
      },
    },
    className: {
      control: "text",
      description: "Dodatkowe klasy CSS dla sekcji",
    },
  },
}

export default meta
type Story = StoryObj<typeof SectionControl>

// Helper do tworzenia elementów testowych
const generateItems = (count: number) => {
  return Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      className="border-border bg-card transform rounded-lg border p-5 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <p className="text-card-foreground text-lg font-medium">Element {index + 1}</p>
      <p className="text-muted-foreground mt-2 text-sm">Przykładowa zawartość elementu</p>
    </div>
  ))
}

// Generowanie artykułów podobnych do tych na zdjęciu
const generateArticles = (count: number) => {
  const authors = [
    { name: "Adam Jędrusyna", avatar: "https://placehold.co/30x30" },
    { name: "Anita Ciesielska", avatar: "https://placehold.co/30x30" },
  ]

  const titles = ["Gemini 2.0 w stronę autonomii", "Nowe narzędzie konwersacyjne od ElevenLabs"]

  const descriptions = [
    "Google zaprezentował najnowszy model AI. Czy to znaczący postęp? A może próba dogonienia konkurencji?",
    "Polsko-amerykański startup łączy klonowanie głosu i zaawansowane modele językowe, by tworzyć wirtualnych asystentów i rozwijać doświadczenia w obsłudze klienta, grach czy edukacji.",
  ]

  const images = [
    "https://placehold.co/600x400?text=Gemini+2.0",
    "https://placehold.co/600x400?text=ElevenLabs",
  ]

  const dates = ["27.12", "24.12"]

  return Array.from({ length: count }).map((_, index) => {
    const idx = index % 2

    return (
      <div key={index} className="group relative mb-6 flex flex-col overflow-hidden">
        <div className="relative z-10 mb-2 flex items-center gap-2">
          <img
            src={authors[idx].avatar}
            alt={authors[idx].name}
            className="border-muted h-8 w-8 rounded-full border"
          />
          <span className="text-muted-foreground text-sm">{authors[idx].name}</span>
        </div>

        <div className="relative flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <h3 className="text-primary/90 mb-2 text-2xl font-normal tracking-tight">
              {titles[idx]}
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">{descriptions[idx]}</p>
          </div>

          <div className="relative md:w-1/3">
            <div className="bg-background/80 text-primary absolute top-0 right-0 z-10 px-2 py-1 text-sm">
              {dates[idx]}
            </div>
            <img
              src={images[idx]}
              alt={titles[idx]}
              className="aspect-video w-full rounded-md object-cover"
            />
          </div>
        </div>

        <div className="bg-border/30 absolute right-0 bottom-0 left-0 h-px" />
      </div>
    )
  })
}

// Przykładowe dane TextDTO z poprawnym typem FontSize i FontWeight
const sampleText = {
  text: "Najnowsze",
  style: {
    fontSize: "text-5xl" as FontSize,
    fontWeight: "font-medium" as FontWeight,
  },
}

export const ArticlesSection: Story = {
  args: {
    maxColumns: 2,
    title: sampleText,
    className: "mx-auto max-w-6xl p-8",
    children: generateArticles(4),
  },
  parameters: {
    docs: {
      description: {
        story: "Przykład sekcji z artykułami, podobny do układu ze zdjęcia.",
      },
    },
  },
}

export const DefaultSection: Story = {
  args: {
    maxColumns: 4,
    title: {
      text: "Sekcja z elementami",
      style: {
        fontSize: "text-2xl" as FontSize,
        fontWeight: "font-medium" as FontWeight,
      },
    },
    className: "gap-6 p-4 text-foreground",
    children: generateItems(8),
  },
}

export const SingleColumn: Story = {
  args: {
    maxColumns: 1,
    title: {
      text: "Sekcja z jedną kolumną",
      style: {
        fontSize: "text-xl" as FontSize,
        fontWeight: "font-semibold" as FontWeight,
      },
    },
    className: "gap-6 p-4 text-foreground",
    children: generateItems(4),
  },
}

export const TwoColumns: Story = {
  args: {
    maxColumns: 2,
    title: {
      text: "Sekcja z dwiema kolumnami",
      style: {
        fontSize: "text-xl" as FontSize,
        fontWeight: "font-bold" as FontWeight,
      },
    },
    className: "gap-6 p-4 text-foreground",
    children: generateItems(6),
  },
}

export const ThreeColumns: Story = {
  args: {
    maxColumns: 3,
    title: {
      text: "Sekcja z trzema kolumnami",
      style: {
        fontSize: "text-xl" as FontSize,
        fontWeight: "font-medium" as FontWeight,
      },
    },
    className: "gap-6 p-4 text-foreground",
    children: generateItems(9),
  },
}

export const CustomStyle: Story = {
  args: {
    maxColumns: 4,
    title: {
      text: "Sekcja z własnym stylem",
      style: {
        fontSize: "text-3xl" as FontSize,
        fontWeight: "font-light" as FontWeight,
      },
    },
    className: "bg-accent/10 p-8 rounded-xl shadow-md gap-6 text-accent-foreground",
    children: generateItems(12),
  },
}

export const LargeTitle: Story = {
  args: {
    maxColumns: 4,
    title: {
      text: "Sekcja z dużym tytułem",
      style: {
        fontSize: "text-4xl" as FontSize,
        fontWeight: "font-bold" as FontWeight,
      },
    },
    className: "gap-6 p-4 text-foreground",
    children: generateItems(8),
  },
}

// Przykład z różnymi typami komponentów jako children
export const MixedContent: Story = {
  render: args => (
    <SectionControl
      maxColumns={args.maxColumns || 3}
      title={{
        text: "Sekcja z mieszaną zawartością",
        style: {
          fontSize: "text-2xl" as FontSize,
          fontWeight: "font-medium" as FontWeight,
        },
      }}
      className="text-foreground gap-6 p-4"
    >
      <div className="border-border bg-primary/10 rounded-lg border p-5 shadow-md transition-all hover:shadow-lg">
        <p className="text-primary-foreground text-xl font-medium">Element główny</p>
        <p className="text-muted-foreground mt-2 text-sm">Zawartość elementu</p>
      </div>
      <div className="border-border bg-secondary/10 rounded-lg border p-5 shadow-md transition-all hover:shadow-lg">
        <p className="text-secondary-foreground text-xl font-medium">Element dodatkowy</p>
        <p className="text-muted-foreground mt-2 text-sm">Zawartość elementu</p>
      </div>
      <div className="border-border bg-accent/10 rounded-lg border p-5 shadow-md transition-all hover:shadow-lg">
        <p className="text-accent-foreground text-xl font-medium">Element akcentowy</p>
        <p className="text-muted-foreground mt-2 text-sm">Zawartość elementu</p>
      </div>
      <div className="border-border bg-popover rounded-lg border p-5 shadow-md transition-all hover:shadow-lg">
        <p className="text-popover-foreground text-xl font-medium">Element popover</p>
        <p className="text-muted-foreground mt-2 text-sm">Zawartość elementu</p>
      </div>
      <div className="border-destructive bg-destructive/10 rounded-lg border p-5 shadow-md transition-all hover:shadow-lg">
        <p className="text-destructive-foreground text-xl font-medium">Element destruktywny</p>
        <p className="text-muted-foreground mt-2 text-sm">Zawartość elementu</p>
      </div>
    </SectionControl>
  ),
}

export const ConfigurableGrid: Story = {
  args: {
    maxColumns: 3,
    title: {
      text: "Sekcja z konfigurowalną liczbą kolumn",
      style: {
        fontSize: "text-2xl" as FontSize,
        fontWeight: "font-semibold" as FontWeight,
      },
    },
    className: "gap-6 p-4 text-foreground",
    children: generateItems(12),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Użyj kontrolek Storybook poniżej, aby zmienić maksymalną liczbę kolumn w siatce. Wartość można ustawić od 1 do 6.",
      },
    },
  },
}
