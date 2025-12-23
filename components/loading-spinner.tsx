export default function LoadingSpinner({ message = "Ładowanie..." }: { message?: string }) {
  return (
    <div className="container mx-auto flex min-h-[200px] items-center justify-center py-12">
      <div className="flex flex-col items-center gap-4">
        <div className="border-muted border-t-primary h-12 w-12 animate-spin rounded-full border-4" />
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
    </div>
  )
}
