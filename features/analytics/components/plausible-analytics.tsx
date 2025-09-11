import Script from "next/script"

export function PlausibleAnalytics() {
  const analyticsDomain = process.env.ANALYTICS_DOMAIN
  const analyticsUrl = process.env.ANALYTICS_URL

  if (!analyticsDomain || !analyticsUrl) {
    return <></>
  }

  return (
    <>
      <Script defer data-domain={analyticsDomain} src={analyticsUrl} strategy="afterInteractive" />
      <Script id="plausible-init" strategy="afterInteractive">
        {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
      </Script>
    </>
  )
}
