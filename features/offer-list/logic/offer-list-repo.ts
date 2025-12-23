import { cacheLife, cacheTag } from "next/cache"
import { gql } from "@apollo/client"
import { imageDTO, ImageResponse } from "@/features/common/common-repos"
import { OfferDTO } from "@/features/offer-list/logic/offer-list-type"
import { graphqlFetch } from "@/lib/graph-ql/fetch-client"
import { IMAGE_FIELDS } from "@/lib/graph-ql/fragment-defs"

export type OfferListResponse = {
  offers: OfferResponse[]
}

export type OfferResponse = {
  id: number
  offerId: string
  title: string
  subtitle: string
  description: string
  image: ImageResponse
}

const listQuery = gql`
  query {
    offers {
      offerId
      title
      subtitle
      description
      image {
        ...ImageFields
      }
    }
  }
  ${IMAGE_FIELDS}
`

export async function fetchOfferListFromCMS() {
  "use cache"
  cacheLife("days") // 24h
  cacheTag("offers")
  cacheTag("offer-list")

  const data = await graphqlFetch<{ offers: OfferResponse[] }>(listQuery)

  const result: OfferDTO[] = data.offers.map(
    offer =>
      ({
        ...offer,
        image: imageDTO(offer.image),
      }) satisfies OfferDTO,
  )

  return result
}
