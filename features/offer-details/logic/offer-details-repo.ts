import { imageDTO, ImageResponse } from "@/features/common/common-repos"
import { OfferDetailsDTO } from "@/features/offer-details/logic/offer-details-type"
import client, { gql } from "@/lib/graph-ql/client"
import { IMAGE_FIELDS } from "@/lib/graph-ql/fragment-defs"

export type OfferDetailsQueryResponse = {
  offerDetails: OfferDetailsResponse
}

export type OfferDetailsResponse = {
  offerImage: ImageResponse
  imageGallery: ImageResponse[]
  sections: OfferDetailsSectionResponse[]
}

export type OfferDetailsSectionResponse = {
  title: string
  subtitle: string
  description: string
  image: ImageResponse
}

const detailsQuery = gql`
  query ($filters: OfferFiltersInput) {
    offers(filters: $filters) {
      offerDetails {
        sections {
          title
          subtitle
          description
          image {
            ...ImageFields
          }
        }
        imageGallery {
          ...ImageFields
        }
        offerImage {
          ...ImageFields
        }
      }
    }
  }

  ${IMAGE_FIELDS}
`

export async function fetchOfferDetailsFromCMS(offerId: string) {
  const { data } = await client.query<{ offers: OfferDetailsQueryResponse[] }>({
    query: detailsQuery,
    variables: {
      filters: {
        offerId: {
          eq: offerId,
        },
      },
    },
  })

  const offer = data.offers[0].offerDetails

  const result = {
    offerImage: imageDTO(offer.offerImage),
    sections: offer.sections.map(section => ({
      ...section,
      image: imageDTO(section.image),
    })),
    imageGallery: offer.imageGallery.map(img => imageDTO(img)),
  } satisfies OfferDetailsDTO

  return result
}
