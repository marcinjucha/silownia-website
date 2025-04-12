import { ImageControlFields } from "@/components/controls/image"
import { imageDTO, ImageResponse } from "@/features/common/common-repos"
import { SEOMetadataDTO } from "@/features/seo/logic/seo-type"
import client, { gql } from "@/lib/graph-ql/client"
import { IMAGE_FIELDS } from "@/lib/graph-ql/fragment-defs"

export type SEOMetadataResponse = {
  title: string
  description: string
  keywords: string
  canonical: string
  openGraph: {
    title: string
    description: string
    type: SEOOpenGraphTypeResponse
    url: string
    image: ImageResponse
  }
}

export type SEOOpenGraphTypeResponse = "website"

const listQuery = gql`
  query {
    seos {
      title
      description
      keywords
      canonical
      openGraph {
        title
        description
        type
        url
        image {
          ...ImageFields
        }
      }
    }
  }
  ${IMAGE_FIELDS}
`

export async function fetchSeoFromCMS() {
  const { data } = await client.query<{ seos: SEOMetadataResponse[] }>({
    query: listQuery,
  })

  const result: SEOMetadataDTO = data.seos.map(item => ({
    title: item.title,
    description: item.description,
    keywords: item.keywords,
    canonical: item.canonical,
    openGraph: {
      description: item.openGraph.description,
      title: item.openGraph.title,
      type: item.openGraph.type,
      url: item.openGraph.url,
      image: imageDTO(item.openGraph.image),
    },
  }))[0]

  return result
}
