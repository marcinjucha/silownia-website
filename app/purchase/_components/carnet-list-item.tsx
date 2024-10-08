"use client"

import { CarnetListOrder } from "@/app/purchase/_components/carnet-list"
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
import { CarnetDTO, CarnetOptionDTO } from "@/repos/carnet-list-repo"
import { Minus, Plus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function CarnetListItem({
  carnet,
  onAdd,
}: {
  carnet: CarnetDTO
  onAdd: (order: CarnetListOrder) => void
}) {
  const [quantity, setQuantity] = useState(1)
  const [selectedOption, setSelectedOption] = useState<CarnetOptionDTO | undefined>()

  function onSelectValueChange(id: string) {
    const options = carnet.carnetOptions?.options
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
    const order = {
      name: selectedOption ? `${carnet.title} - ${selectedOption.title}` : carnet.title,
      quantity,
      price: selectedOption ? selectedOption.price : carnet.price || -1,
    } satisfies CarnetListOrder

    onAdd(order)
  }

  return (
    <AccordionItem key={carnet.id} value={`item-${carnet.id}`}>
      <AccordionTrigger>{carnet.title}</AccordionTrigger>
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
        {carnet.carnetOptions && (
          <Select onValueChange={onSelectValueChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={carnet.carnetOptions.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {carnet.carnetOptions.options.map(option => (
                <SelectItem key={option.id} value={`${option.id}`}>
                  {option.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {carnet.description && <p className="mb-2">{carnet.description}</p>}
        {selectedOption && <p className="mb-2">{selectedOption.description}</p>}
        {(carnet.price || selectedOption) && (
          <>
            <div className="space-y-item flex flex-col">
              {carnet.price && <p className="font-bold">Price: ${carnet.price}</p>}
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
