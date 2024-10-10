"use client"

import { CarnetListItem } from "@/app/kup-karnet/_components/carnet-list-item"
import { Accordion } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CarnetDTO } from "@/repos/carnet-list-repo"
import React, { useState } from "react"

type CarnetListItem = {
  id: number
  name: string
  price: number
  description: string
}

type CarnetListProps = {
  carnets: CarnetDTO[]
}

export type CarnetListOrder = {
  name: string
  quantity: number
  price: number
}

export default function CarnetList({ carnets }: CarnetListProps) {
  const [bucket, setBucket] = useState<CarnetListOrder[]>([])

  function addToBucket(newOrder: CarnetListOrder) {
    console.log("log: carnet", newOrder)

    const index = bucket.findIndex(item => item.name === newOrder.name)

    if (index == -1) {
      setBucket(val => [...val, newOrder])
    } else {
      const data = [...bucket]
      const order = data[index]
      order.quantity += newOrder.quantity
      data.splice(index, 1, order)
      setBucket(() => [...data])
    }
  }

  const total = bucket.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      <section className="space-y-section bg-background p-4">
        <h1 className="text-center text-3xl font-bold">Select Your Training Package</h1>
        <Accordion type="single" collapsible className="grid gap-4 lg:grid-cols-2">
          {carnets.map(carnet => (
            <CarnetListItem key={carnet.id} carnet={carnet} onAdd={addToBucket} />
          ))}
        </Accordion>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Your Booking Overview</CardTitle>
        </CardHeader>
        <CardContent>
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
              {bucket.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.name}</TableCell>
                  <TableCell className="text-right">${order.price}</TableCell>
                  <TableCell className="text-right">${order.quantity}</TableCell>
                  <TableCell className="text-right">${order.price * order.quantity}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">${total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
