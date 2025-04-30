import { getSliderUseCase } from "@/features/layout/slider/logic/slider-use-case"
import { fetchSliderFromCms } from "@/features/layout/slider/logic/slider-repo"

export async function fetchSlider() {
  const result = await getSliderUseCase({
    getSlider: fetchSliderFromCms,
  })

  return result
}
