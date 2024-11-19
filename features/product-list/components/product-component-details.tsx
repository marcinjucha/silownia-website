import { ProductComponentDetailsDTO } from "@/features/product-list/logic/product-list-repo"
import Image from "next/image"

export default function ProductComponentDetails({
  component,
  children,
}: {
  component?: ProductComponentDetailsDTO
  children?: React.ReactNode
}) {
  const { price, description, image } = component || {}

  return (
    <div className="space-y-item">
      {image && (
        <Image
          className="rounded-md"
          src={image.url}
          width={image.width}
          height={image.height}
          alt={image.alt || "image"}
        />
      )}

      {children && children}

      {description && <p className="mb-2">{description}</p>}
      {price && <p className="font-bold">Cena: {price}zł</p>}
    </div>
  )
}
