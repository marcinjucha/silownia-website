"use client"

import { Button } from "@/components/ui/button"
import { Form, FormField, useFormWithAction } from "@/components/ui/form"
import { calculateChecksum } from "@/features/purchase/actions/purchase-action"
import { PurchaseFormData, purchaseFormSchema } from "@/features/purchase/actions/purchase-type"
import { AdditionalInformation } from "@/features/purchase/components/additional-information"
import { OrderSummary } from "@/features/purchase/components/order-summary"
import { PersonalDetails } from "@/features/purchase/components/personal-details"
import { EspagoConfig } from "@/features/purchase/logic/purchase-repo"
import { ProductOrderDTO } from "@/features/purchase/logic/product-order-repo"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, useState } from "react"

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

  const totalPrice = (10.0).toFixed(2) // products.reduce((prev, curr) => prev + curr.totalPrice, 0).toFixed(2)
  const description = products.reduce((prev, curr) => prev + "# " + curr.name + "\n", "")

  const params = new URLSearchParams({
    appId: config.appId,
    sessionId: config.sessionId,
    amount: totalPrice,
    currency: "PLN",
  })

  async function onSubmit(formData: PurchaseFormData) {
    const form = formRef.current
    const checksumInput = checksumRef.current
    const successInput = successRef.current
    const failureInput = failureRef.current
    if (!form || !checksumInput || !successInput || !failureInput) return

    setIsSubmitting(true)

    const checksum = await calculateChecksum(formData)

    if (checksum.error) {
      setIsSubmitting(false)
      // TODO: display error - alert
      return
    }

    if (checksum.checksum) {
      checksumInput.value = checksum.checksum
      params.append("checksum", checksum.checksum!)
      successInput.value = `${config.successURL}?${params.toString()}`
      failureInput.value = `${config.failureURL}?${params.toString()}`

      form.submit()
      return
    }

    setIsSubmitting(false)
    // TODO: display error - alert
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
            defaultValue={`Zamowienie:${config.paymentId}`}
            render={({ field }) => <input {...field} type="hidden" />}
          />
          <input name="kind" type="hidden" value="sale" />
          <input name="description" type="hidden" value={description} />
          <input ref={successRef} name="positive_url" type="hidden" />
          <input ref={failureRef} name="negative_url" type="hidden" />
          <input name="ts" type="hidden" value={config.timestamp} />
          <input ref={checksumRef} name="checksum" type="hidden" />
        </form>
      </Form>
    </>
  )
}

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button type="submit" disabled={isSubmitting} className="w-full">
      {isSubmitting ? "Submitting..." : "Kup teraz"}
    </Button>
  )
}
