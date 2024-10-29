import { successResult } from "@/lib/utils"
import { ProductPurchaseDTO } from "@/repos/purchase-repo"

export async function submitProductOrderUseCase(context: {}, purchase: ProductPurchaseDTO) {
  console.log("log: submit purchase", purchase)
  new Promise(resolve => setTimeout(resolve, 1000))
  return successResult("Hurray")
}
