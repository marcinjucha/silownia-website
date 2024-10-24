import { fetchCarnetList } from "@/app/kup-karnet/_action/fetch-carnet-list"
import CarnetList from "@/app/kup-karnet/_components/carnet-list"

export default async function PurchaseListPage() {
  const carnets = await fetchCarnetList()

  return (
    <div className="space-container">
      <CarnetList carnets={carnets} />
    </div>
  )
}
