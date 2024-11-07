import { fetchOfferDetailsUseCase } from "@/features/offer-details/logic/offer-details-use-case"
import { fetchOfferListFromCMS } from "@/features/offer-list/logic/offer-list-repo"
import {
  offerListDTOSample,
  offerListResposneSample as offerListResponseSample,
} from "@/lib/test-samples"
import fetchMock from "jest-fetch-mock"

fetchMock.enableMocks()

const CMS_BASE_URL = process.env.CMS_BASE_URL

// TESTY
describe("Fetch offer details use case", () => {
  const response = offerListResponseSample
  const dto = offerListDTOSample(response)[0]

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
