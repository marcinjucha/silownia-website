import { fetchCarnetList } from "@/app/purchase/_action/fetch-carnet-list"
import CarnetList from "@/app/purchase/_components/carnet-list"

export default async function PurchaseListPage() {
  console.log(process.env.TOKEN, process.env.CMS_URL)
  const carnets = await fetchCarnetList()

  return <CarnetList />
}
