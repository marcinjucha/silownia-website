"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ProductComponentDetails from "@/features/product-list/components/product-component-details"
import {
  ProductComponentDetailsDTO,
  ProductComponentSelectOptionDTO,
} from "@/features/product-list/logic/product-list-repo"
import { useState } from "react"

export function ProductComponentSelectOption({
  component,
  onChange,
}: {
  component: ProductComponentSelectOptionDTO
  onChange: (value: ProductComponentDetailsDTO) => void
}) {
  const { placeholder, options } = component
  const [selectedOption, setSelectedOption] = useState<ProductComponentDetailsDTO | undefined>()

  function onSelectValueChange(id: string) {
    const index = options.findIndex(option => option.id === id)

    if (index === -1) {
      return
    }

    const option = options[index]
    setSelectedOption(() => option)
    onChange(option)
  }

  return (
    <div className="space-y-item">
      <ProductComponentDetails component={selectedOption}>
        <Select onValueChange={onSelectValueChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option.id} value={`${option.id}`}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </ProductComponentDetails>
    </div>
  )
}
