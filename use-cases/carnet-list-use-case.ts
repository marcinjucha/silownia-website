import { CarnetDTO } from "@/repos/carnet-list-repo"

export type FetchCarnetList = () => Promise<CarnetDTO[]>

export async function fetchCarnetListUseCase(context: { fetch: FetchCarnetList }) {
  try {
    const list = await context.fetch()
    return list
  } catch (err) {
    console.error("Fetch carnet list use case error", err)
    return []
  }
}
