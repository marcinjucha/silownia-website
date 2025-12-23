import { Suspense } from "react"
import LoadingSpinner from "@/components/loading-spinner"
import { fetchPrivacyTerms } from "@/features/legal/actions/fetch-legal-data-action"
import LegacyContentRenderer from "@/features/legal/components/legal-content-renderer"

async function PrivacyPolicyContent() {
  const data = await fetchPrivacyTerms()
  return <LegacyContentRenderer data={data} />
}

export default function PrivacyPolicyPage() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner message="Ładowanie polityki prywatności..." />}>
        <PrivacyPolicyContent />
      </Suspense>
    </div>
  )
}
