import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PurchaseFormData } from "@/features/purchase/actions/purchase-type"
import { Control } from "react-hook-form"

export function PersonalDetails({ control }: { control: Control<PurchaseFormData> }) {
  return (
    <>
      <h2 className="mb-4 text-3xl font-bold">Dane kontaktowe</h2>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <FormField
            name="firstName"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imię *</FormLabel>
                <FormControl>
                  <Input placeholder="Imię" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            name="lastName"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwisko *</FormLabel>
                <FormControl>
                  <Input placeholder="Nazwisko" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            name="email"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adres e-mail *</FormLabel>
                <FormControl>
                  <Input placeholder="adres e-mail" {...field} />
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
