import { confirmationStatusProvider } from "@/features/confirmation/logic/confirmation-repo"
import { getConfirmationStatusUseCase } from "@/features/confirmation/logic/confirmation-use-case"
import { notFound } from "next/navigation"
import { match } from "ts-pattern"

export async function getConfirmationStatus() {
  const result = getConfirmationStatusUseCase({ statusProvider: confirmationStatusProvider })

  const status = match(result)
    .with({ success: true }, val => val.value)
    .with({ success: false }, () => notFound())
    .exhaustive()

  return status
}
