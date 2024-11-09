import { saveConfirmationStatus } from "@/features/confirmation/logic/confirmation-repo"
import { espagoChecksumProvider } from "@/features/purchase/logic/purchase-repo"
import { paymentConfirmationAPIUseCase } from "@/features/purchase/logic/purchase-use-case"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import { match } from "ts-pattern"

export async function GET(req: NextRequest) {
  const result = paymentConfirmationAPIUseCase(
    {
      espageChecksumProvider: espagoChecksumProvider,
      saveConfirmationStatus: saveConfirmationStatus,
    },
    {
      params: req.nextUrl.searchParams,
      success: true,
    },
  )

  const value = match(result)
    .with({ success: true }, val => val.value)
    .with({ success: false }, () =>
      NextResponse.json({ error: "Unauthorized access" }, { status: 401 }),
    )
    .exhaustive()

  if (value instanceof NextResponse) {
    return value
  } else {
    redirect("/kup-karnet/potwierdzenie")
  }
}
