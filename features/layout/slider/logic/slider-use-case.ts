import { SliderDTO } from "@/features/layout/slider/logic/slider-type"
import { clientError, ClientResult, clientValue, executePromise } from "@/lib/error-handling"

type GetSlider = () => Promise<SliderDTO | null>

export async function getSliderUseCase(context: {
  getSlider: GetSlider
}): Promise<ClientResult<SliderDTO>> {
  const result = await executePromise(context.getSlider)

  if (!result.success || !result.value) {
    return clientError("Wystąpił błąd podczas pobierania slidera")
  }

  return clientValue(result.value)
}
