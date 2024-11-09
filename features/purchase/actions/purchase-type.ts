import { z } from "zod"

export const purchaseFormSchema = z.object({
  app_id: z.string(),
  session_id: z.string(),
  amount: z.string(),
  currency: z.string().default("PLN"),
  title: z.string(),
  firstName: z.string().min(1, "Wymagane jest imię"),
  lastName: z.string().min(1, "Wymagane jest nazwisko"),
  email: z.string().email("Nieprawidłowy adres e-mail"),
  orderNotes: z.string().optional(),
})

export type PurchaseFormData = z.infer<typeof purchaseFormSchema>
