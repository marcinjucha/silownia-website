import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ProductOrderItemDTO } from "@/features/purchase/logic/product-order-repo"

export function OrderSummary({
  products,
  totalPrice,
}: {
  products: ProductOrderItemDTO[]
  totalPrice: string
}) {
  return (
    <>
      <h2 className="mb-4 text-3xl font-bold">Your order</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-primary">Product</TableHead>
            <TableHead className="text-right font-bold text-primary">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.name}>
              <TableCell>
                {product.quantity}x {product.name}
              </TableCell>
              <TableCell className="text-right">${product.totalPrice}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-bold text-primary">Total</TableCell>
            <TableCell className="text-right font-bold text-primary">{totalPrice}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}
