import { getProductOrderFromCookies } from "@/features/product-order/logic/product-order-repo"
import { getProductOrderUseCase } from "@/features/product-order/logic/product-order-use-case"
import { redirect } from "next/navigation"
import { match } from "ts-pattern"

export async function getProductOrder() {
  const result = getProductOrderUseCase({ getProductOrder: getProductOrderFromCookies })

  const value = match(result)
    .with({ success: true }, val => val.value)
    .with({ success: false }, () => redirect("/kup-karnet"))
    .exhaustive()

  return value
}
