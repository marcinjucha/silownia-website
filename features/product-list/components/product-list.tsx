"use client"

import { ProductListItem } from "@/features/product-list/components/product-list-item"
import { ProductDTO } from "@/features/product-list/logic/product-list-repo"

type Props = {
  products: ProductDTO[]
}

export default function ProductList({ products }: Props) {
  return (
    <>
      <section className="space-y-section bg-background mb-8 p-4">
        <h1 className="text-center text-3xl font-bold">Wybierz pakiet treningowy</h1>
        <div className="grid gap-4 lg:grid-cols-2">
          {products.map(product => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}
