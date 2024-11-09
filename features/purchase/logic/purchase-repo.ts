import { randomInt } from "crypto"
import { cookies } from "next/headers"

export type EspagoConfig = {
  url: string
  apiVersion: string
  appId: string
  sessionId: string
  timestamp: string
  paymentId: string
  successURL: string
  failureURL: string
}

export type EspagoChecksumData = {
  appId: string
  sessionId: string
  amount: string
  currency: string
}

export function espagoConfigProvider() {
  const url = process.env.ESPAGO_URL!
  const appId = process.env.ESPAGO_APP_ID!
  const isProd = process.env.NODE_ENV === "production"
  const baseURL = isProd ? process.env.HOST_URL! : "http://example.com"
  const successURL = `${baseURL}${isProd ? "/api/zamowienie/success" : "/payments/ok"}`
  const failureURL = `${baseURL}${isProd ? "/api/zamowienie/failure" : "/payments/bad"}`

  return {
    url,
    apiVersion: "3",
    appId: appId,
    sessionId: "1559655843622983577", // Date.now().toString(),
    timestamp: "1444044688", // Math.floor(Date.now() / 1000).toString(),
    paymentId: randomInt(100000, 200000).toString(),
    successURL,
    failureURL,
  } satisfies EspagoConfig
}

export function espagoChecksumProvider({ appId, sessionId, amount, currency }: EspagoChecksumData) {
  const secretKey = process.env.ESPAGO_SECRET_KEY
  const checksumData = `${appId}|${sessionId}|${amount}|${currency}|${secretKey}`

  return "938ee2f7729ac4ba1a7c98f5ead8b167" // createHash("md5").update(checksumData).digest("hex")
}
