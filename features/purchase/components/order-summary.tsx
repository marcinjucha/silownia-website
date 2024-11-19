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
      <h2 className="mb-4 text-3xl font-bold">Twoje zamówienie</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-primary">Produkt</TableHead>
            <TableHead className="text-right font-bold text-primary">Wartość</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.name}>
              <TableCell>
                {product.quantity}x {product.name}
              </TableCell>
              <TableCell className="text-right">{product.totalPrice}zł</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="font-bold text-primary">Wartość zamówienia</TableCell>
            <TableCell className="text-right font-bold text-primary">{totalPrice}zł</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  )
}
