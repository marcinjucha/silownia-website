"use client"

import { PurchaseFormData } from "@/app/kup-karnet/zamowienie/_actions/purchase-type"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Control } from "react-hook-form"

export function AdditionalInformation({ control }: { control: Control<PurchaseFormData> }) {
  return (
    <>
      <h2 className="mb-4 text-3xl font-bold">Additional information</h2>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <FormField
            name="orderNotes"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Notes (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  )
}
