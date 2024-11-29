import { imageDTO, ImageResponse } from "@/features/common/common-repos"
import { HomeOfferDTO } from "@/features/home/logic/home-offer-list-type"
import client, { gql } from "@/lib/graph-ql/client"
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
  const { data } = await client.query<{ offers: HomeOfferResponse[] }>({ query: listQuery })

  const result: HomeOfferDTO[] = data.offers.map(
    offer =>
      ({
        ...offer,
        image: imageDTO(offer.homeImage),
      }) satisfies HomeOfferDTO,
  )

  return result
}
