import { ImageControlDTO, ImageControlFields } from "@/components/controls/image"
import { TextControlDTO, TextControlFields } from "@/components/controls/text"
import { imageDTO, ImageResponse } from "@/features/common/common-repos"
import {
  OfferDetailsDTO,
  OfferDetailsTrainerDTO,
} from "@/features/offer-details/logic/offer-details-type"
import client, { gql } from "@/lib/graph-ql/client"
import { IMAGE_FIELDS } from "@/lib/graph-ql/fragment-defs"

export type OfferDetailsQueryResponse = {
  offerDetails: OfferDetailsResponse
}

export type OfferDetailsResponse = {
  offerImage: ImageResponse
  imageGallery: ImageResponse[]
  sections: OfferDetailsSectionResponse[]
  trainersTitle: TextControlDTO
  trainers: OfferDetailsTrainerDTO[]
}

export type OfferDetailsSectionResponse = {
  title: string
  subtitle: string
  description: string
  image: ImageResponse
}

export type OfferDetailsTrainerResponse = {
  title: TextControlDTO
  description: TextControlDTO
  image: ImageControlDTO
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
        trainersTitle {
          ...TextControlFields
        }
        trainers {
          title {
            ...TextControlFields
          }
          description {
            ...TextControlFields
          }
          image {
            ...ImageControlFields
          }
        }
      }
    }
  }

  ${IMAGE_FIELDS}
  ${ImageControlFields}
  ${TextControlFields}
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
    trainersTitle: offer.trainersTitle,
    trainers: offer.trainers.map(trainer => ({
      ...trainer,
    })),
  } satisfies OfferDetailsDTO

  return result
}
