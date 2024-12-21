import { SEOMetadataDTO } from "./seo-type"
import { executePromise } from "@/lib/utils"

export type FetchSEOMetadata = () => Promise<SEOMetadataDTO>

export async function fetchSEOMetadataUseCase(context: { fetch: FetchSEOMetadata }) {
  const result = await executePromise(context.fetch)

  if (result.success) {
    return result.value
  }

  return {
    title: "Progress Gym Wrocław",
    description:
      "Nowoczesna siłownia i klub fitness przy ul. Paprotnej 14A. Siłownia 1800 m², sztuki walki, fitness, pole dance, akrobatyka i strefa relaksu",
    keywords:
      "Progress Gym Wrocław, klub fitness, siłownia Wrocław, sztuki walki, pole dance, akrobatyka, fitness, Dolny Śląsk",
    canonical: "https://progressgymacademy.pl",
    openGraph: {
      title: "Progress Gym Wrocław – Nowoczesny klub fitness we Wrocławiu",
      description:
        "Nowoczesna siłownia i klub fitness przy ul. Paprotnej 14A. Siłownia 1800 m², sztuki walki, fitness, pole dance, akrobatyka i strefa relaksu",
      type: "website",
      url: "https://progressgymacademy.pl",
      image: {
        url: "/public/logozlote.png",
        width: 500,
        height: 500,
        alt: "Logo Progress Gym Wrocław",
      },
    },
  } satisfies SEOMetadataDTO
}
