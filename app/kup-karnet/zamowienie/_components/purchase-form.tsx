"use client"

import { submitPurchaseForm } from "@/app/kup-karnet/zamowienie/_actions/purchase-submit-form-action"
import {
  PurchaseFormData,
  purchaseFormSchema,
} from "@/app/kup-karnet/zamowienie/_actions/purchase-type"
import { AdditionalInformation } from "@/app/kup-karnet/zamowienie/_components/additional-information"
import { OrderSummary } from "@/app/kup-karnet/zamowienie/_components/order-summary"
import { PersonalDetails } from "@/app/kup-karnet/zamowienie/_components/personal-details"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, useFormWithAction as useFormWithAction } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormStatus } from "react-dom"

export function PurchaseForm() {
  const form = useFormWithAction<PurchaseFormData>({
    resolver: zodResolver(purchaseFormSchema),
  })

  async function onAction(values: PurchaseFormData) {
    await submitPurchaseForm(values)
  }

  return (
    <Form {...form}>
      <form action={form.handleAction(onAction)}>
        <div className="space-y-section grid gap-6 lg:grid-cols-2">
          <div className="space-y-section">
            <PersonalDetails control={form.control} />
            <AdditionalInformation control={form.control} />
          </div>
          <div>
            <Card className="">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">Your order</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderSummary />
              </CardContent>
            </Card>
            <div className="mt-6">
              <h2 className="mb-4 text-3xl font-bold">Payment Method</h2>
              <SubmitButton />
            </div>
          </div>
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
