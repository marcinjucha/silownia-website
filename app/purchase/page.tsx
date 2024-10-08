import { fetchCarnetList } from "@/app/purchase/_action/fetch-carnet-list"
import CarnetList from "@/app/purchase/_components/carnet-list"

export default async function PurchaseListPage() {
  const carnets = await fetchCarnetList()

  return (
    <div className="space-container">
      <CarnetList carnets={carnets} />
    </div>
  )
}
