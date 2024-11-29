"use client"

import { Button } from "@/components/ui/button"
import { Form, FormField, useFormWithAction } from "@/components/ui/form"
import { ProductOrderDTO } from "@/features/product-order/logic/product-order-type"
import { calculateChecksum, savePurchaseOrder } from "@/features/purchase/actions/purchase-action"
import { PurchaseFormData, purchaseFormSchema } from "@/features/purchase/actions/purchase-type"
import { AdditionalInformation } from "@/features/purchase/components/additional-information"
import { OrderSummary } from "@/features/purchase/components/order-summary"
import { PersonalDetails } from "@/features/purchase/components/personal-details"
import { EspagoConfig } from "@/features/purchase/logic/purchase-type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, useState } from "react"
import { match } from "ts-pattern"

type Props = {
  order: ProductOrderDTO
  config: EspagoConfig
}

export function PurchaseForm({ order, config }: Props) {
  const products = order.products
  const form = useFormWithAction<PurchaseFormData>({
    resolver: zodResolver(purchaseFormSchema),
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)
  const checksumRef = useRef<HTMLInputElement>(null)
  const successRef = useRef<HTMLInputElement>(null)
  const failureRef = useRef<HTMLInputElement>(null)

  const totalPrice = (10).toFixed(2) // products.reduce((prev, curr) => prev + curr.totalPrice, 0).toFixed(2)

  async function onSubmit(formData: PurchaseFormData) {
    const form = formRef.current
    const checksumInput = checksumRef.current
    const successInput = successRef.current
    const failureInput = failureRef.current
    if (!form || !checksumInput || !successInput || !failureInput) return

    setIsSubmitting(true)

    const checksumResult = await calculateChecksum(formData)

    if (!checksumResult.success) {
      setIsSubmitting(false)
      // TODO: display error - alert
      return
    }
    const checksum = checksumResult.value

    const orderResult = await savePurchaseOrder({
      paymentId: config.paymentId,
      checksum,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      otherNotes: formData.orderNotes,
      products: order.products,
    })

    if (!orderResult.success) {
      setIsSubmitting(false)
      // TODO: display error - alert
      return
    }

    const params = new URLSearchParams({
      purchaseId: orderResult.value,
    })
    checksumInput.value = checksum
    successInput.value = `${config.successURL}?${params.toString()}`
    failureInput.value = `${config.failureURL}?${params.toString()}`

    form.submit()

    setIsSubmitting(false)
  }

  return (
    <>
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(onSubmit)}
          action={config.url}
          method="post"
        >
          <div className="space-y-section grid gap-6 lg:grid-cols-2 lg:space-y-0">
            <section className="space-y-section">
              <PersonalDetails control={form.control} />
              <AdditionalInformation control={form.control} />
            </section>
            <section>
              <OrderSummary products={products} totalPrice={totalPrice} />

              <div className="mt-6">
                <SubmitButton isSubmitting={isSubmitting} />
              </div>
            </section>
          </div>
          <input name="api_version" type="hidden" value={config.apiVersion} />
          <FormField
            name="app_id"
            control={form.control}
            defaultValue={config.appId}
            render={({ field }) => <input {...field} type="hidden" />}
          />
          <FormField
            name="session_id"
            control={form.control}
            defaultValue={config.sessionId}
            render={({ field }) => <input {...field} type="hidden" />}
          />
          <FormField
            name="amount"
            control={form.control}
            defaultValue={totalPrice}
            render={({ field }) => <input {...field} type="hidden" />}
          />
          <FormField
            name="currency"
            control={form.control}
            defaultValue="PLN"
            render={({ field }) => <input {...field} type="hidden" />}
          />
          <FormField
            name="title"
            control={form.control}
            defaultValue={config.paymentId}
            render={({ field }) => <input {...field} type="hidden" />}
          />
          <input name="kind" type="hidden" value="sale" />
          <input ref={successRef} name="positive_url" type="hidden" />
          <input ref={failureRef} name="negative_url" type="hidden" />
          <input name="ts" type="hidden" value={config.timestamp} />
          <input name="locale" type="hidden" value="pl" />
          <input ref={checksumRef} name="checksum" type="hidden" />
        </form>
      </Form>
    </>
  )
}

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button type="submit" disabled={isSubmitting} className="w-full">
      {isSubmitting ? "Przesyłanie..." : "Kup teraz"}
    </Button>
  )
}
