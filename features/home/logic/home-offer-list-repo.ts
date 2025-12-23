import { cacheLife, cacheTag } from "next/cache"
import { gql } from "@apollo/client"
import { imageDTO, ImageResponse } from "@/features/common/common-repos"
import { HomeOfferDTO } from "@/features/home/logic/home-offer-list-type"
import { graphqlFetch } from "@/lib/graph-ql/fetch-client"
import { IMAGE_FIELDS } from "@/lib/graph-ql/fragment-defs"

export type HomeOfferResponse = {
  id: number
  offerId: string
  title: string
  homeImage: ImageResponse
}

const listQuery = gql`
  query {
    offers {
      offerId
      title
      homeImage {
        ...ImageFields
      }
    }
  }
  ${IMAGE_FIELDS}
`

export async function fetchHomeOfferListFromCMS() {
  "use cache"
  cacheLife("days") // 24h
  cacheTag("offers")
  cacheTag("home-offers")

  const data = await graphqlFetch<{ offers: HomeOfferResponse[] }>(listQuery)

  const result: HomeOfferDTO[] = data.offers.map(
    offer =>
      ({
        ...offer,
        image: imageDTO(offer.homeImage),
      }) satisfies HomeOfferDTO,
  )

  return result
}
