import { getProductOrder } from "@/features/product-order/actions/get-product-order"
import { getEspagoConfig } from "@/features/purchase/actions/purchase-action"
import { PurchaseForm } from "@/features/purchase/components/purchase-form"

export default async function ProductOrderPage() {
  const order = await getProductOrder()
  const config = await getEspagoConfig()

  return (
    <div className="space-container">
      <PurchaseForm order={order} config={config} />
    </div>
  )
}
