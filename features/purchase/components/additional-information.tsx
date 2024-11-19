import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { PurchaseFormData } from "@/features/purchase/actions/purchase-type"
import { Control } from "react-hook-form"

export function AdditionalInformation({ control }: { control: Control<PurchaseFormData> }) {
  return (
    <>
      <h2 className="mb-4 text-3xl font-bold">Dodatkowe informacje</h2>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <FormField
            name="orderNotes"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Uwagi do zamówienia (opcjonalnie)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Uwagi dotyczące zamówienia, np. specjalne uwagi dotyczące dostawy."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  )
}
