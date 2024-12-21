import { fetchPrivacyTerms } from "@/features/legal/actions/fetch-legal-data-action"
import LegacyContentRenderer from "@/features/legal/components/legal-content-renderer"

export default async function PrivacyPolicyPage() {
  const data = await fetchPrivacyTerms()

  return (
    <div>
      <LegacyContentRenderer data={data} />
    </div>
  )
}
