import { PurchaseForm } from "@/app/purchase/[order]/_components/purchase-form"

export default function PurchaseFormPage({ params }: { params: { order: string } }) {
  return (
    <div className="space-container">
      <PurchaseForm />
    </div>
  )
}
