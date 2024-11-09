import ConfirmationView from "@/features/confirmation/components/confirmation-view"

export default function ConfirmationPage() {
  const isPaymentSuccessful = true

  return <ConfirmationView isPaymentSuccessful={isPaymentSuccessful} />
}
