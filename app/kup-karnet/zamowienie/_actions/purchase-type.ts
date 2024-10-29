import { z } from "zod"

export const purchaseFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  orderNotes: z.string().optional(),
})

export type PurchaseFormData = z.infer<typeof purchaseFormSchema>
