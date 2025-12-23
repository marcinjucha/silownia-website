import { Suspense } from "react"
import LoadingSpinner from "@/components/loading-spinner"
import { fetchRegulamin } from "@/features/legal/actions/fetch-legal-data-action"
import LegacyContentRenderer from "@/features/legal/components/legal-content-renderer"

async function RegulaminContent() {
  const data = await fetchRegulamin()
  return <LegacyContentRenderer data={data} />
}

export default function RegulaminPage() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner message="Ładowanie regulaminu..." />}>
        <RegulaminContent />
      </Suspense>
    </div>
  )
}
