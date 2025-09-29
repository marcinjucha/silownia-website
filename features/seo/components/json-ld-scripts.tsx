import Script from "next/script"
import { fetchJSONLD } from "@/features/seo/action/json-ld-action"

export async function JsonLdScripts() {
  const jsonLd = await fetchJSONLD()

  if (!jsonLd || jsonLd.length === 0) {
    return <></>
  }

  return (
    <>
      {jsonLd.map((node, idx) => (
        <Script
          key={`json-ld-${idx}`}
          id={`json-ld-${idx}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  )
}
