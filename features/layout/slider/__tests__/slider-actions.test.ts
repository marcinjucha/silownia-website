import { clientError, clientValue } from "@/lib/error-handling"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import * as sliderUseCase from "../logic/slider-use-case"
import { SliderDTO } from "../logic/slider-type"
import { fetchSlider } from "../actions/slider-actions"
import * as nextNavigation from "next/navigation"

vi.mock("../logic/slider-use-case.ts")

describe("fetchSlider", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it("should return value when everything is ok", async () => {
    // Arrange

    function createMockSliderDTO(): SliderDTO {
      return {
        title: { text: "Title", style: {} },
        sliderItem: [],
      }
    }

    const mockSliderDTO = createMockSliderDTO()

    vi.mocked(sliderUseCase.getSliderUseCase).mockResolvedValue(clientValue(mockSliderDTO))

    // Act

    const result = await fetchSlider()

    // Assert

    // expect(result).toEqual(mockSliderDTO)

    expect(result).toEqual(clientValue(mockSliderDTO))

    expect(sliderUseCase.getSliderUseCase).toHaveBeenCalledTimes(1)

    expect(nextNavigation.notFound).not.toHaveBeenCalled()
  })

  it("should not return value", async () => {
    // Arrange

    vi.mocked(sliderUseCase.getSliderUseCase).mockResolvedValue(
      clientError("Wystąpił błąd podczas pobierania slidera"),
    )

    // Act

    const result = await fetchSlider()

    // Assert

    expect(result).toEqual(clientError("Wystąpił błąd podczas pobierania slidera"))

    expect(sliderUseCase.getSliderUseCase).toHaveBeenCalledTimes(1)
  })
})
