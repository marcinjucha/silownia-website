import React from "react"
import ConfirmationCard from "@/features/confirmation/components/confirmation-card"
import { CheckCircle, AlertCircle } from "lucide-react"

interface ConfirmationViewProps {
  isPaymentSuccessful: boolean
}

const ConfirmationView: React.FC<ConfirmationViewProps> = ({ isPaymentSuccessful }) => {
  return isPaymentSuccessful ? (
    <ConfirmationCard
      title="Zakup zakończony pomyślnie!"
      subtitle="Dziękujemy, za bycie częścią naszej społeczności!"
      secondarySubtitle="Twój udział ma dla nas ogromne znaczenie."
      message="Sprawdź swój e-mail, aby uzyskać więcej informacji."
      icon={CheckCircle}
      buttonText="Sprawdź resztę naszej oferty"
      buttonLink="/oferta"
      className="text-green-500"
    />
  ) : (
    <ConfirmationCard
      title="Coś poszło nie tak..."
      subtitle="Niestety, wystąpił problem z realizacją zakupu."
      message="Spróbuj ponownie lub skontaktuj się z nami!"
      icon={AlertCircle}
      buttonText="Kup karnet"
      buttonLink="/kup-karnet"
      className="text-red-700"
    />
  )
}

export default ConfirmationView
