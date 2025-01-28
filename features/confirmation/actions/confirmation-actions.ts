import { getConfirmationStatusFromCookies } from "@/features/confirmation/logic/confirmation-repos"
import { getConfirmationStatusUseCase } from "@/features/confirmation/logic/confirmation-use-cases"
import { notFound } from "next/navigation"
import { match } from "ts-pattern"

export async function getConfirmationStatus() {
  const result = await getConfirmationStatusUseCase({
    statusProvider: getConfirmationStatusFromCookies,
  })

  const status = match(result)
    .with({ success: true }, val => val.value)
    .with({ success: false }, () => notFound())
    .exhaustive()

  return status
}
