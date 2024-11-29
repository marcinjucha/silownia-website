"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProductComponentDetails from "@/features/product-list/components/product-component-details"
import { ProductComponentSelectOption } from "@/features/product-list/components/product-component-select-option"
import {
  ProductComponentDetailsDTO,
  ProductComponentSelectOptionDTO,
  ProductDTO,
} from "@/features/product-list/logic/product-list-repo"
import { ProductOrderItemDTO } from "@/features/product-order/logic/product-order-type"
import { Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"

export function ProductListItem({
  product,
  onAdd,
}: {
  product: ProductDTO
  onAdd: (order: ProductOrderItemDTO) => void
}) {
  const { id, title, content, note } = product
  const [quantity, setQuantity] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<ProductComponentDetailsDTO | undefined>()

  function handleAddButtonClick() {
    if (!selectedProduct) return

    const price = selectedProduct.price
    const order = {
      name: selectedProduct.name ? `${product.title} - ${selectedProduct.name}` : product.title,
      quantity,
      price,
      totalPrice: price * quantity,
    } satisfies ProductOrderItemDTO
    onAdd(order)
  }

  return (
    <AccordionItem key={id} value={`item-${id}`}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent className="space-y-item">
        <>
          <ProductComponent key={content.id} component={content} onChange={setSelectedProduct} />
          <ProductQuantity key={selectedProduct?.id} onChange={setQuantity} />
          <Button onClick={handleAddButtonClick} disabled={!selectedProduct}>
            Dodaj do zamówienia
          </Button>
        </>
        {note && <p>{note}</p>}
      </AccordionContent>
    </AccordionItem>
  )
}

function ProductComponent({
  component,
  onChange,
}: {
  component: ProductComponentSelectOptionDTO | ProductComponentDetailsDTO
  onChange: (value: ProductComponentDetailsDTO) => void
}) {
  useEffect(() => {
    if (component.component === "product-details") {
      onChange(component)
    }
  }, [])

  let content
  if (component.component === "product-details") {
    content = <ProductComponentDetails component={component} />
  }

  if (component.component === "product-select-option") {
    content = <ProductComponentSelectOption component={component} onChange={onChange} />
  }

  return <>{content}</>
}

export function ProductQuantity({ onChange }: { onChange: (quantity: number) => void }) {
  const [quantity, setQuantity] = useState(1)

  function handleQuantityUpdate(quantity: number) {
    if (quantity < 1 || quantity > 99) {
      return
    }

    setQuantity(quantity)
    onChange(quantity)
  }

  return (
    <div className="flex">
      <Button
        variant="outline"
        size="icon"
        className="rounded-r-none"
        onClick={handleQuantityUpdate.bind(null, quantity - 1)}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        value={quantity}
        onChange={e => handleQuantityUpdate(+e.target.value)}
        min={1}
        max={99}
        className="w-16"
      />
      <Button
        variant="outline"
        size="icon"
        className="rounded-l-none"
        onClick={handleQuantityUpdate.bind(null, quantity + 1)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
