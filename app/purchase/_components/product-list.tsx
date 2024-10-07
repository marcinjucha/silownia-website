"use client"

import React from "react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type Product = {
  id: number
  name: string
  price: number
  description: string
}

const products = [
  {
    id: 1,
    name: "Bangtao Brawl 2 (Fight Night)",
    price: 800,
    description:
      "Join us on September 28th for Bangtao Brawl 2! An epic lineup of PRO and amateur fights in Muay Thai, Boxing, MMA, and Grappling. Live DJ, giveaways, food, and fights included with your ticket.",
  },
  {
    id: 2,
    name: "Video & Photography Package",
    price: 500,
    description: "Professional video and photography coverage of your training sessions or fights.",
  },
  {
    id: 3,
    name: "Gear Package (10% OFF)",
    price: 450,
    description:
      "Complete set of training gear including gloves, shin guards, and headgear at a discounted price.",
  },
  {
    id: 4,
    name: "Nutrition and Meal Plan",
    price: 300,
    description: "Customized nutrition and meal plan to support your training goals.",
  },
]

export default function ProductList() {
  const [bucket, setBucket] = React.useState<Product[]>([])

  const addToBucket = (product: Product) => {
    setBucket([...bucket, product])
  }

  const total = bucket.reduce((sum, item) => sum + item.price, 0)

  return (
    <>
      <section className="space-section p-4">
        <h1 className="text-center text-3xl font-bold">Select Your Training Package</h1>
        <Accordion type="single" collapsible className="grid gap-4 lg:grid-cols-2">
          {products.map(product => (
            <AccordionItem key={product.id} value={`item-${product.id}`}>
              <AccordionTrigger>{product.name}</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">{product.description}</p>
                <p className="mb-4 font-bold">Price: ${product.price}</p>
                <Button onClick={() => addToBucket(product)}>Add to Booking</Button>
              </AccordionContent>
            </AccordionItem>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {bucket.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right">${item.price}</TableCell>
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
