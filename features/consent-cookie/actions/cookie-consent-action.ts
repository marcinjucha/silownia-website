"use server"

import { cookies } from "next/headers"

export async function hasConsent(): Promise<boolean> {
  const consentCookie = (await cookies()).get("cookieConsent")
  return consentCookie?.value === "true"
}

export async function setConsent() {
  ;(await cookies()).set("cookieConsent", "true", { maxAge: 60 * 60 * 24 * 365 })
}
