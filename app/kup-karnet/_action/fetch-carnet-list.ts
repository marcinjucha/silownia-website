import { fetchCarnetListFromCMS } from "@/repos/carnet-list-repo"
import { fetchCarnetListUseCase } from "@/use-cases/carnet-list-use-case"

export async function fetchCarnetList() {
  return await fetchCarnetListUseCase({ fetch: fetchCarnetListFromCMS })
}
