import { fetchRegulamin } from "@/features/legal/actions/fetch-legal-data-action"
import LegacyContentRenderer from "@/features/legal/components/legal-content-renderer"

export default async function RegulaminPage() {
  const data = await fetchRegulamin()

  return (
    <div>
      <LegacyContentRenderer data={data} />
    </div>
  )
}
