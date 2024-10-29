"use server"

import { getProductOrderFromCookies as getCarnetOrderFromCookies } from "@/repos/product-order-repo"
import { getProductOrderUseCase } from "@/use-cases/product-order-use-case"
import { redirect } from "next/navigation"

export async function getProductOrder() {
  const result = getProductOrderUseCase({ getProductOrder: getCarnetOrderFromCookies })

  console.log("log: result", result)
  if (result.success) {
    return result.value
  }

  redirect("/kup-karnet")
}
