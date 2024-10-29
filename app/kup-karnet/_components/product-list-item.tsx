"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProductDTO, ProductOptionDTO } from "@/repos/product-list-repo"
import { ProductOrderItemDTO } from "@/repos/product-order-repo"
import { cp } from "fs"
import { Minus, Plus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function ProductListItem({
  product,
  onAdd,
}: {
  product: ProductDTO
  onAdd: (order: ProductOrderItemDTO) => void
}) {
  const [quantity, setQuantity] = useState(1)
  const [selectedOption, setSelectedOption] = useState<ProductOptionDTO | undefined>()

  function onSelectValueChange(id: string) {
    const options = product.productOptions?.options
    if (!options) {
      return
    }
    const index = options.findIndex(option => option.id === +id)

    if (index === -1) {
      return
    }

    const option = options[index]
    setSelectedOption(() => option)
    setQuantity(() => 1)
  }

  function handleQuantityUpdate(quantity: number) {
    if (quantity < 1 || quantity > 99) {
      return
    }

    setQuantity(quantity)
  }

  function handleAddButtonClick() {
    const price = selectedOption ? selectedOption.price : product.price || -1
    const order = {
      name: selectedOption ? selectedOption.title : product.title,
      quantity,
      price,
      totalPrice: price * quantity,
    } satisfies ProductOrderItemDTO

    onAdd(order)
  }

  return (
    <AccordionItem key={product.id} value={`item-${product.id}`}>
      <AccordionTrigger>{product.title}</AccordionTrigger>
      <AccordionContent className="space-y-item">
        {selectedOption?.image && (
          <Image
            className="rounded-md"
            src={selectedOption.image.url}
            width={selectedOption.image.width}
            height={selectedOption.image.height}
            alt={selectedOption.image.alternativeText}
          />
        )}
        {product.productOptions && (
          <Select onValueChange={onSelectValueChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={product.productOptions.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {product.productOptions.options.map(option => (
                <SelectItem key={option.id} value={`${option.id}`}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {product.description && <p className="mb-2">{product.description}</p>}
        {selectedOption && <p className="mb-2">{selectedOption.description}</p>}
        {(product.price || selectedOption) && (
          <>
            <div className="space-y-item flex flex-col">
              {product.price && <p className="font-bold">Price: ${product.price}</p>}
              {selectedOption && <p className="font-bold">Price: ${selectedOption.price}</p>}

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
            </div>

            <Button onClick={handleAddButtonClick}>Add to Booking</Button>
          </>
        )}
      </AccordionContent>
    </AccordionItem>
  )
}
