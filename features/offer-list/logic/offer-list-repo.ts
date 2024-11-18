import { imageDTO, ImageResponse } from "@/features/common/repo"
import { OfferDTO } from "@/features/offer-list/logic/offer-list-type"
import client, { gql } from "@/lib/graph-ql/client"
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
  const { data } = await client.query<{ offers: OfferResponse[] }>({ query: listQuery })

  const result: OfferDTO[] = data.offers.map(
    offer =>
      ({
        ...offer,
        image: imageDTO(offer.image),
      }) satisfies OfferDTO,
  )

  return result
}
