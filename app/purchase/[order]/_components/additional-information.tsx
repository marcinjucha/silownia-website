"use client"

import { PurchaseFormData } from "@/app/purchase/[order]/_actions/purchase-type"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Control } from "react-hook-form"

export function AdditionalInformation({ control }: { control: Control<PurchaseFormData> }) {
  return (
    <div>
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
        <div className="grid gap-2">
          <FormField
            name="orderNotes"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>How did you hear about us? (optional)</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Choose an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="search">Search Engine</SelectItem>
                      <SelectItem value="ad">Advertisement</SelectItem>
                      <SelectItem value="friend">Friend Recommendation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}
