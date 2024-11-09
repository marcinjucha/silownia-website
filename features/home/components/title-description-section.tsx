import { Button } from "@/components/ui/button"

type TitleDescriptionSectionProps = {
  title?: string
  description?: string
  children?: React.ReactNode
}

export default function TitleDescriptionSection({
  title,
  description,
  children,
}: TitleDescriptionSectionProps) {
  return (
    <section className="mx-auto my-12 w-full max-w-6xl px-4 text-center">
      {title && <h2 className="mb-4 text-3xl font-bold text-primary">{title}</h2>}
      {description && <p className="mb-8 text-lg leading-relaxed">{description}</p>}
      {children}
    </section>
  )
}
