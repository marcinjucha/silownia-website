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

export type SEOResponse = {
  seo: SEOMetadataResponse
}

const listQuery = gql`
  query {
    seos {
      seo {
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
  }
  ${IMAGE_FIELDS}
`

export async function fetchSeoFromCMS() {
  const { data } = await client.query<{ seos: SEOResponse[] }>({
    query: listQuery,
  })

  const result: SEOMetadataDTO = data.seos.map(item => ({
    title: item.seo.title,
    description: item.seo.description,
    keywords: item.seo.keywords,
    canonical: item.seo.canonical,
    openGraph: {
      description: item.seo.openGraph.description,
      title: item.seo.openGraph.title,
      type: item.seo.openGraph.type,
      url: item.seo.openGraph.url,
      image: imageDTO(item.seo.openGraph.image),
    },
  }))[0]

  return result
}
