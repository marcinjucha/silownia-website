"use client"

import { submitProductBooking } from "@/app/kup-karnet/_action/submit-product-booking"
import { ProductListItem } from "@/app/kup-karnet/_components/product-list-item"
import { Accordion } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ProductDTO } from "@/repos/product-list-repo"
import { ProductOrderItemDTO } from "@/repos/product-order-repo"
import React, { useState } from "react"

type ProductListItem = {
  id: number
  name: string
  price: number
  description: string
}

type ProductListProps = {
  products: ProductDTO[]
}

export default function ProductList({ products }: ProductListProps) {
  const [items, setItems] = useState<ProductOrderItemDTO[]>([])

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0)

  function addToBucket(newOrder: ProductOrderItemDTO) {
    const index = items.findIndex(item => item.name === newOrder.name)

    if (index == -1) {
      setItems(val => [...val, newOrder])
    } else {
      const data = [...items]
      const order = data[index]
      order.quantity += newOrder.quantity
      data.splice(index, 1, order)
      setItems(() => [...data])
    }
  }

  function handleBookingButton() {
    submitProductBooking({ products: items })
  }

  return (
    <>
      <section className="space-y-section bg-background p-4">
        <h1 className="text-center text-3xl font-bold">Select Your Training Package</h1>
        <Accordion type="single" collapsible className="grid gap-4 lg:grid-cols-2">
          {products.map(product => (
            <ProductListItem key={product.id} product={product} onAdd={addToBucket} />
          ))}
        </Accordion>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Your Booking Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-item">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.name}</TableCell>
                  <TableCell className="text-right">${order.price}</TableCell>
                  <TableCell className="text-right">${order.quantity}</TableCell>
                  <TableCell className="text-right">${order.totalPrice}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">${total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button disabled={items.length === 0} onClick={handleBookingButton}>
            Proceed with this booking
          </Button>
        </CardContent>
      </Card>
    </>
  )
}
