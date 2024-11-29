import { PurchaseOrderFormDTO } from "@/features/purchase/logic/purchase-type"
import PurchaseConfirmationEmail from "@/lib/emails/purchase-confirmation-email"
import { executeError, executeValue, ExecutionResult } from "@/lib/utils"
import { cookies } from "next/headers"
import { Resend } from "resend"

export function saveConfirmationStatusToCookies(status: string) {
  cookies().set("confirmationKey", status)
}

export function getConfirmationStatusFromCookies() {
  return cookies().get("confirmationKey")?.value || ""
}

export async function sendPurchaseConfirmationEmailResend(purchase: PurchaseOrderFormDTO) {
  type Result = ExecutionResult<string, string>

  const apiKey = process.env.RESEND_API_KEY || ""
  if (apiKey.length === 0) return executeValue("") as Result

  const resend = new Resend(apiKey)

  const { data, error } = await resend.emails.send({
    from: "Progress Gym Academy <onboarding@resend.dev>",
    to: [purchase.email],
    subject: "Potwierdzenie zakupu dla Progress Gym Academy",
    react: PurchaseConfirmationEmail({ purchase }),
  })

  if (error) {
    console.error("Resend send email error", error)
    return executeError(error.message) as Result
  }

  if (data) {
    console.info("Resend send email data", data)
    return executeValue(data.id) as Result
  }

  return executeValue("") as Result
}
