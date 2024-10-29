import fetchOfferDetailsFromCMS, {
  OfferDetailsDTO,
  OfferDetailsResponse,
} from "@/repos/offer-details-repo"
import { fetchOfferDetailsUseCase } from "@/use-cases/offer-details-use-case"
import fetchMock from "jest-fetch-mock"

fetchMock.enableMocks()

const CMS_BASE_URL = process.env.CMS_BASE_URL
const CMS_API_KEY = process.env.CMS_API_KEY

// TESTY
describe("Fetch offer details use case", () => {
  const response = {
    data: {
      id: "mma",
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
    },
    images: [
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
  } satisfies OfferDetailsResponse

  const dto = {
    id: "mma",
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
    const result = await fetchOfferDetailsUseCase({ fetch: fetchOfferDetailsFromCMS }, id)

    // then
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock).toHaveBeenCalledWith(`${CMS_BASE_URL}/api/offer-details/${id}?populate=*`, {
      headers: { Authorization: `Bearer ${CMS_API_KEY}` },
    })

    if (result.success) expect(result.value).toEqual(dto)
    else fail()
  })

  it("invoke fetch method throw error", async () => {
    // given
    const errorMsg = "fetching failed"
    fetchMock.mockRejectOnce(new Error(errorMsg))

    // when
    const result = await fetchOfferDetailsUseCase({ fetch: fetchOfferDetailsFromCMS }, "id")

    // then
    if (result.success) fail()
    else expect(result.error.message).toEqual(errorMsg)
  })
})

/*
Happy path
1. przekazanie id ✅
2. Stworzenie serwius od pobierania ✅
2.5. przekazanie serwisu do pobrania ✅
3. wywołanie serwisu (network call do cms) z id ✅
3.5 wywołanie metody fetch ✅
4. zwrócenie (wymaga przygotowania) response (jak wygląda) ✅
5. fuck up -> co jeśli response failed -> error ✅
*/
