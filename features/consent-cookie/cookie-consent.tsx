"use client"

import { useState, useEffect } from "react"
import { hasConsent, setConsent } from "@/features/consent-cookie/actions/cookie-consent-action"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { TriangleAlert } from "lucide-react"

const CookieConsent: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const checkConsent = async () => {
      const consentGiven = await hasConsent()
      if (!consentGiven) {
        setShowAlert(true)
      }
    }

    checkConsent()
  }, [])

  const handleConsent = async () => {
    await setConsent()
    setShowAlert(false)
  }

  if (!showAlert) return null

  return (
    <Alert className="border-primary bg-background fixed right-0 bottom-0 z-50 max-w-(--breakpoint-sm) border-4 p-4">
      <div className="flex items-start justify-between">
        <div>
          <AlertTitle className="flex items-center p-1">
            <TriangleAlert className="text-primary mr-2 h-6 w-6" />
            Używamy plików cookies
          </AlertTitle>
          <AlertDescription>
            Ta witryna korzysta z plików cookies w celu realizacji usług zgodnie z
            <Link href="/polityka-prywatnosci" className="text-primary mx-1 underline">
              Polityką Prywatności
            </Link>
            i
            <Link href="/regulamin" className="text-primary mx-1 underline">
              Regulaminem
            </Link>
            . Korzystanie z niniejszej witryny internetowej jest równoznaczne ze zgodą użytkownika
            na stosowanie plików Cookies.
            <button
              onClick={handleConsent}
              className="text-primary ml-1 cursor-pointer underline sm:ml-0"
            >
              Zrozumiałem i akceptuję
            </button>
          </AlertDescription>
        </div>
        <button onClick={handleConsent} className="">
          &times;
        </button>
      </div>
    </Alert>
  )
}

export default CookieConsent
