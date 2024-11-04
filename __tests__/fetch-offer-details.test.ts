import { OfferDetailsDTO } from "@/features/common/dtos"
import { fetchOfferDetailsUseCase } from "@/features/offer-details/logic/offer-details-use-case"
import {
  fetchOfferListFromCMS,
  OfferListResponse,
} from "@/features/offer-list/logic/offer-list-repo"
import fetchMock from "jest-fetch-mock"

fetchMock.enableMocks()

const CMS_BASE_URL = process.env.CMS_BASE_URL

// TESTY
describe("Fetch offer details use case", () => {
  const response = {
    data: [
      {
        id: 1,
        offerId: "mma",
        description: "desc 1",
        title: "title 1",
        subtitle: "subtitle 1",
        image: {
          alternativeText: "alt 1 ",
          height: 1,
          width: 2,
          mime: "mime 1",
          url: "/uploads/mma-1.jpg",
        },
        offerDetails: {
          sections: [
            {
              title: "MMA for Beginners",
              subtitle: "Start your journey",
              description: "Lorem Ipsum is simply dummy text - 1",
              image: {
                alternativeText: "alt 1",
                height: 1,
                width: 2,
                mime: "mime 1",
                url: "/uploads/mma-1.jpg",
              },
            },
            {
              title: "Advanced MMA Classes",
              subtitle: "Push your limits",
              description: "Lorem Ipsum is simply dummy text - 2",
              image: {
                alternativeText: "alt 2",
                height: 2,
                width: 2,
                mime: "mime 2",
                url: "/uploads/mma-2.jpg",
              },
            },
            {
              title: "Meet Our MMA Coach",
              subtitle: "Train with the best",
              description: "Our experienced coaches will guide you through every step...",
              image: {
                alternativeText: "alt 3",
                height: 3,
                width: 2,
                mime: "mime 3",
                url: "/uploads/mma-3.jpg",
              },
            },
          ],
          imageGallery: [
            {
              alternativeText: "alt gal 1 ",
              height: 1,
              width: 2,
              mime: "mime 1",
              url: "/uploads/mma-gal-1.jpg",
            },
            {
              alternativeText: "alt gal 2",
              height: 1,
              width: 2,
              mime: "mime 2",
              url: "/uploads/mma-gal-2.jpg",
              previewUrl: "/uploads/mma-gal-preview-2.jpg",
            },
          ],
        },
      },
    ],
  } satisfies OfferListResponse

  const dto = {
    sections: [
      {
        title: "MMA for Beginners",
        subtitle: "Start your journey",
        description: "Lorem Ipsum is simply dummy text - 1",
        image: {
          alternativeText: "alt 1",
          height: 1,
          width: 2,
          mime: "mime 1",
          url: `${CMS_BASE_URL}/uploads/mma-1.jpg`,
        },
      },
      {
        title: "Advanced MMA Classes",
        subtitle: "Push your limits",
        description: "Lorem Ipsum is simply dummy text - 2",
        image: {
          alternativeText: "alt 2",
          height: 2,
          width: 2,
          mime: "mime 2",
          url: `${CMS_BASE_URL}/uploads/mma-2.jpg`,
        },
      },
      {
        title: "Meet Our MMA Coach",
        subtitle: "Train with the best",
        description: "Our experienced coaches will guide you through every step...",
        image: {
          alternativeText: "alt 3",
          height: 3,
          width: 2,
          mime: "mime 3",
          url: `${CMS_BASE_URL}/uploads/mma-3.jpg`,
        },
      },
    ],
    imageGallery: [
      {
        alternativeText: "alt gal 1 ",
        height: 1,
        width: 2,
        mime: "mime 1",
        url: `${CMS_BASE_URL}/uploads/mma-gal-1.jpg`,
      },
      {
        alternativeText: "alt gal 2",
        height: 1,
        width: 2,
        mime: "mime 2",
        url: `${CMS_BASE_URL}/uploads/mma-gal-2.jpg`,
        previewUrl: `${CMS_BASE_URL}/uploads/mma-gal-preview-2.jpg`,
      },
    ],
  } satisfies OfferDetailsDTO

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it("invoke fetch method should return offer details dto", async () => {
    // given
    const id = "mma"
    fetchMock.mockResponseOnce(JSON.stringify(response))

    // when
    const result = await fetchOfferDetailsUseCase({ fetch: fetchOfferListFromCMS }, id)

    // then
    if (result.success) expect(result.value).toEqual(dto)
    else fail()
  })

  it("invoke fetch method throw error", async () => {
    // given
    const errorMsg = "fetching failed"
    fetchMock.mockRejectOnce(new Error(errorMsg))

    // when
    const result = await fetchOfferDetailsUseCase({ fetch: fetchOfferListFromCMS }, "id")

    // then
    if (result.success) fail()
    else expect(result.error.message).toEqual(errorMsg)
  })
})
