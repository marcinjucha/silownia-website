import { getProductOrder } from "@/app/kup-karnet/zamowienie/_actions/get-product-order"
import { submitPurchaseForm } from "@/app/kup-karnet/zamowienie/_actions/purchase-submit-form"
import { PurchaseFormData } from "@/app/kup-karnet/zamowienie/_actions/purchase-type"
import { PurchaseForm } from "@/app/kup-karnet/zamowienie/_components/purchase-form"
import { PaymentMethodDTO } from "@/repos/purchase-repo"

export default async function ProductOrderPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const order = await getProductOrder()

  return (
    <div className="space-container">
      <PurchaseForm order={order} />
    </div>
  )
}
