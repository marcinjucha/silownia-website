import { beforeEach, describe, expect, it, vi, afterEach } from "vitest"
import client from "@/lib/graph-ql/client"
import { clientError, clientValue } from "@/lib/error-handling"
import { createApolloResponse } from "@/features/__tests__/test-utils"
import { getSliderUseCase } from "../logic/slider-use-case"
import { fetchSliderFromCms as getSlider } from "../logic/slider-repo"
import { SliderDTO } from "../logic/slider-type"

describe("getSliderUseCase", () => {
  const mockApolloResponse = createApolloResponse({
    slider: {
      title: {
        text: "Partnerzy",
        style: {},
      },
      sliderItem: [
        {
          link: "https://www.onet.pl",
          image: {
            alt: "karate",
            imageFormat: "small",
            image: {
              url: "/uploads/logo_dabeea11ed.svg",
              width: 350,
              height: 149,
            },
          },
        },
        {
          link: "https://www.cnn.com",
          image: {
            alt: "logo",
            imageFormat: "small",
            image: {
              url: "/uploads/instagram_73dcd29117.svg",
              width: 24,
              height: 24,
            },
          },
        },
      ],
    },
  })
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should provide valid data", async () => {
    // Arrange

    vi.mocked(client.query).mockResolvedValue(mockApolloResponse)

    //   Act
    const result = await getSliderUseCase({ getSlider })
    // Assert

    const expectedSliderData: SliderDTO = {
      title: {
        text: "Partnerzy",
        style: {},
      },

      sliderItem: [
        {
          link: "https://www.onet.pl",
          image: {
            alt: "karate",
            imageFormat: "small",
            image: {
              url: "/uploads/logo_dabeea11ed.svg",
              width: 350,
              height: 149,
            },
          },
        },

        {
          link: "https://www.cnn.com",
          image: {
            alt: "logo",
            imageFormat: "small",
            image: {
              url: "/uploads/instagram_73dcd29117.svg",
              width: 24,
              height: 24,
            },
          },
        },
      ],
    }

    expect(result).toEqual(clientValue(expectedSliderData))
  })

  it("should return error when fetchinf falls", async () => {
    // Arrange

    const mockError = new Error("fetching failed")

    vi.mocked(client.query).mockRejectedValue(mockError)

    // Act

    const result = await getSliderUseCase({ getSlider })

    // Assert

    expect(result).toEqual(clientError("Wystąpił błąd podczas pobierania slidera"))
  })
})
