import { ConfirmationStatusDTO } from "@/features/confirmation/logic/confirmation-repo"
import { decrypt } from "@/lib/encryption"
import { execute } from "@/lib/utils"

export type ConfirmationStatusProvider = () => string

export function getConfirmationStatusUseCase(context: {
  statusProvider: ConfirmationStatusProvider
}) {
  return execute(() => JSON.parse(decrypt(context.statusProvider())) as ConfirmationStatusDTO)
}
