import { APIResponseStatusDTO } from "@/features/common/common-dtos"
import { NextResponse } from "next/server"
import { match } from "ts-pattern"

export function makeAPIErrorResponseUseCase<T>(success: Boolean, status: APIResponseStatusDTO) {
  console.info(`Purchase confirmation API - ${success}`, status)

  const response = match(status)
    .when(
      val => val.statusCode === 500,
      () => NextResponse.json({ error: "Internal server error" }, { status: 500 }),
    )
    .when(
      val => val.statusCode === 400,
      () => NextResponse.json({ error: "Invalid request" }, { status: 400 }),
    )
    .when(
      val => val.statusCode === 404,
      () => NextResponse.json({ error: "Purchase order not found" }, { status: 404 }),
    )
    .otherwise(() => NextResponse.json({ error: "Unknown error" }, { status: 500 }))

  console.error("API error response", response)
  return response
}
