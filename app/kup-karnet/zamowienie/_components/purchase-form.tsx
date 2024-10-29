"use client"

import { submitPurchaseForm } from "@/app/kup-karnet/zamowienie/_actions/purchase-submit-form"
import {
  PurchaseFormData,
  purchaseFormSchema,
} from "@/app/kup-karnet/zamowienie/_actions/purchase-type"
import { AdditionalInformation } from "@/app/kup-karnet/zamowienie/_components/additional-information"
import { OrderSummary } from "@/app/kup-karnet/zamowienie/_components/order-summary"
import { PersonalDetails } from "@/app/kup-karnet/zamowienie/_components/personal-details"
import { Button } from "@/components/ui/button"
import { Form, useFormWithAction } from "@/components/ui/form"
import { PaymentMethodDTO, ProductPurchaseDTO } from "@/repos/purchase-repo"
import { ProductOrderDTO, ProductOrderItemDTO } from "@/repos/product-order-repo"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormStatus } from "react-dom"

type PurchaseFormProps = {
  order: ProductOrderDTO
}

export function PurchaseForm({ order }: PurchaseFormProps) {
  const products = order.products
  const form = useFormWithAction<PurchaseFormData>({
    resolver: zodResolver(purchaseFormSchema),
  })

  async function onAction(values: PurchaseFormData) {
    await submitPurchaseForm(values, order, PaymentMethodDTO.PAYPAL)
  }

  return (
    <Form {...form}>
      <form action={form.handleAction(onAction)}>
        <div className="space-y-section grid gap-6 lg:grid-cols-2 lg:space-y-0">
          <section className="space-y-section">
            <PersonalDetails control={form.control} />
            <AdditionalInformation control={form.control} />
          </section>
          <section>
            <OrderSummary products={products} />

            <div className="mt-6">
              <h2 className="mb-4 text-3xl font-bold">Payment Method</h2>
              <SubmitButton />
            </div>
          </section>
        </div>
      </form>
    </Form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white hover:bg-blue-700"
    >
      {pending ? "Submitting..." : "PayPal"}
    </Button>
  )
}
