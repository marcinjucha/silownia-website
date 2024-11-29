"use client"

import { Accordion } from "@/components/ui/accordion"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
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
import { submitProductBooking } from "@/features/product-list/actions/submit-product-booking"
import { ProductListItem } from "@/features/product-list/components/product-list-item"
import { ProductDTO } from "@/features/product-list/logic/product-list-repo"
import { ProductOrderItemDTO } from "@/features/product-order/logic/product-order-type"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"
import { Trash, Trash2 } from "lucide-react"
import React, { useState } from "react"

type Props = {
  products: ProductDTO[]
}

export default function ProductList({ products }: Props) {
  const [items, setItems] = useState<ProductOrderItemDTO[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<ProductOrderItemDTO | null>(null)

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0)

  function addToBucket(newOrder: ProductOrderItemDTO) {
    const index = items.findIndex(item => item.name === newOrder.name)

    if (index == -1) {
      setItems(val => [...val, newOrder])
    } else {
      const data = [...items]
      const order = data[index]
      order.quantity += newOrder.quantity
      order.totalPrice = order.quantity * order.price
      data.splice(index, 1, order)
      setItems(() => data)
    }
  }

  function onRemoveOrderFromBucket(order: ProductOrderItemDTO) {
    setSelectedOrder(order)
    setShowDeleteDialog(true)
  }

  function handleDeleteAction() {
    setShowDeleteDialog(false)

    if (!selectedOrder) return

    const index = items.findIndex(item => item.name === selectedOrder.name)

    if (index == -1) return

    const data = [...items]
    data.splice(index, 1)
    setItems(() => data)
  }

  function handleBookingButton() {
    submitProductBooking({ products: items })
  }

  return (
    <>
      <section className="space-y-section bg-background p-4">
        <h1 className="text-center text-3xl font-bold">Wybierz pakiet treningowy</h1>
        <Accordion type="single" collapsible className="grid gap-4 lg:grid-cols-2">
          {products.map(product => (
            <ProductListItem key={product.id} product={product} onAdd={addToBucket} />
          ))}
        </Accordion>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Przegląd zamówienia</CardTitle>
        </CardHeader>
        <CardContent className="space-y-item">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produkt</TableHead>
                <TableHead className="text-right md:w-28">Cena</TableHead>
                <TableHead className="text-right md:w-28">Ilość</TableHead>
                <TableHead className="text-right md:w-28">Wartość</TableHead>
                <TableHead className="md:w-28" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.name}</TableCell>
                  <TableCell className="text-right">{order.price}zł</TableCell>
                  <TableCell className="text-right">{order.quantity}</TableCell>
                  <TableCell className="text-right">{order.totalPrice}zł</TableCell>
                  <TableCell className="text-right">
                    <Trash2
                      className="text-destructive"
                      onClick={onRemoveOrderFromBucket.bind(null, order)}
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold">Wartość zamówienia</TableCell>
                <TableCell className="text-right font-bold">{total}zł</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button disabled={items.length === 0} onClick={handleBookingButton}>
            Zrealizuj zamówienie
          </Button>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogDescription>
            <AlertDialogTitle>Czy na pewno chcesz usunąć ten produkt?</AlertDialogTitle>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <Button variant="destructive" onClick={handleDeleteAction}>
              Usuń
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
