"use server"

import { NextjsMetadata, SEOMetadataDTO } from "./seo-type"
import { executePromise, clientError, clientValue, ClientResult } from "@/lib/error-handling"

export type FetchSEOMetadata = () => Promise<SEOMetadataDTO>

function mapSEOToMetadata(seo: SEOMetadataDTO): NextjsMetadata {
  const metadata: NextjsMetadata = {
    // Podstawowe pola z CMS
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,

    // Pola opcjonalne z CMS
    applicationName: seo.applicationName,
    authors: seo.authors,
    creator: seo.creator,
    publisher: seo.publisher,
    generator: seo.generator,
    category: seo.category,

    // Istotne dla Next.js
    metadataBase: new URL(process.env.HOST_URL || "https://progressgymacademy.pl"),
    referrer: "origin-when-cross-origin",

    // Alternates z CMS
    alternates: {
      canonical: seo.canonical,
      languages: seo.alternates?.languages,
    },

    // Verification z CMS
    verification: seo.verification
      ? {
          google: seo.verification.google,
          yandex: seo.verification.yandex,
          other: {
            ...(seo.verification.bing && { bing: seo.verification.bing }),
            ...(seo.verification.yahoo && { yahoo: seo.verification.yahoo }),
          },
        }
      : undefined,

    // OpenGraph z CMS
    openGraph: seo.openGraph
      ? {
          title: seo.openGraph.title || seo.title,
          description: seo.openGraph.description || seo.description,
          type: seo.openGraph.type || "website",
          url: seo.openGraph.url,
          locale: seo.openGraph.locale,
          siteName: seo.openGraph.siteName,
          images: seo.openGraph.images?.map(image => ({
            url: image.url,
            width: image.width,
            height: image.height,
            alt: image.alt,
            type: image.type,
          })),
          videos: seo.openGraph.videos?.map(video => ({
            url: video.url,
            width: video.width,
            height: video.height,
            type: video.type,
          })),
          audio: seo.openGraph.audio?.map(audio => ({
            url: audio.url,
            type: audio.type,
          })),
          emails: seo.openGraph.emails,
          phoneNumbers: seo.openGraph.phoneNumbers,
        }
      : undefined,

    // Twitter z CMS
    twitter: seo.twitter
      ? {
          card: seo.twitter.card || "summary_large_image",
          site: seo.twitter.site,
          creator: seo.twitter.creator,
          title: seo.twitter.title || seo.openGraph?.title || seo.title,
          description: seo.twitter.description || seo.openGraph?.description || seo.description,
          images:
            seo.twitter.images ||
            (seo.openGraph?.images?.[0]?.url ? [seo.openGraph.images[0].url] : undefined),
        }
      : undefined,

    // Robots z CMS
    robots: seo.robots
      ? {
          index: seo.robots.index ?? true,
          follow: seo.robots.follow ?? true,
          googleBot: seo.robots.googleBot
            ? {
                index: seo.robots.googleBot.index ?? true,
                follow: seo.robots.googleBot.follow ?? true,
                "max-image-preview": seo.robots.googleBot.maxImagePreview || "large",
                "max-snippet": seo.robots.googleBot.maxSnippet ?? -1,
                "max-video-preview": seo.robots.googleBot.maxVideoPreview ?? -1,
              }
            : undefined,
        }
      : undefined,
  }

  // Remove undefined values to keep metadata clean
  return Object.fromEntries(
    Object.entries(metadata).filter(([_, value]) => value !== undefined),
  ) as NextjsMetadata
}

export async function fetchSEOMetadataUseCase(context: {
  fetch: FetchSEOMetadata
}): Promise<ClientResult<NextjsMetadata>> {
  const result = await executePromise(async () => await context.fetch())

  if (result.isFailure) {
    return clientError("Failed to fetch SEO metadata from CMS")
  }

  const metadata = mapSEOToMetadata(result.value)

  return clientValue(metadata)
}
