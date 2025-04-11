import { ImageControlFields } from "@/components/controls/image"
import { SEOImage, SEOMetadataDTO, SEOOpenGraphType } from "@/features/seo/logic/seo-type"
import client, { gql } from "@/lib/graph-ql/client"

type SEOImageResponse = {
  alt: string
  imageFormat: string
  image: {
    url: string
    height: number
    width: number
  }
}

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
    image: SEOImageResponse
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
            ...ImageControlFields
          }
        }
      }
    }
  }
  ${ImageControlFields}
`

function mapCMSImageToSEOImage(cmsImage: SEOImageResponse): SEOImage {
  return {
    url: cmsImage.image.url,
    width: cmsImage.image.width,
    height: cmsImage.image.height,
    alt: cmsImage.alt,
  }
}

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
      type: item.seo.openGraph.type as SEOOpenGraphType,
      url: item.seo.openGraph.url,
      image: mapCMSImageToSEOImage(item.seo.openGraph.image),
    },
  }))[0]

  return result
}
