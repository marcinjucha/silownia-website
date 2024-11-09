import { getConfirmationStatus } from "@/features/confirmation/actions/confirmation-actions"
import ConfirmationCard from "@/features/confirmation/components/confirmation-card"
import { AlertCircle, CheckCircle } from "lucide-react"

export default async function ConfirmationPage() {
  const success = await getConfirmationStatus().then(v => v.success)

  return (
    <ConfirmationCard
      title={success ? "Zakup zakończony pomyślnie!" : "Coś poszło nie tak..."}
      subtitle={
        success
          ? "Dziękujemy, za bycie częścią naszej społeczności!"
          : "Niestety, wystąpił problem z realizacją zakupu."
      }
      secondarySubtitle={success ? "Twój udział ma dla nas ogromne znaczenie." : undefined}
      message={
        success
          ? "Sprawdź swój e-mail, aby uzyskać więcej informacji."
          : "Spróbuj ponownie lub skontaktuj się z nami!"
      }
      icon={success ? CheckCircle : AlertCircle}
      buttonText={success ? "Sprawdź resztę naszej oferty" : "Kup karnet"}
      buttonLink={success ? "/oferta" : "kup-karnet"}
      className={success ? "text-green-500" : "text-red-700"}
    />
  )
}
