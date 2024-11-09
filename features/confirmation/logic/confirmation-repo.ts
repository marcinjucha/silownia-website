import { cookies } from "next/headers"

export type ConfirmationStatusDTO = {
  success: boolean
}

export function saveConfirmationStatus(status: string) {
  cookies().set("confirmationKey", status)
}

export function confirmationStatusProvider() {
  return cookies().get("confirmationKey")?.value || ""
}
