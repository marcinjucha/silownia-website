import { MetadataRoute } from "next"
import { fetchOfferList } from "@/features/offer-list/actions/fetch-offer-list-action"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.HOST_URL || "https://progressgymacademy.pl"

  // Statyczne URL-e
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/oferta`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kup-karnet`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/regulamin`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  try {
    const offers = await fetchOfferList()

    const offerUrls: MetadataRoute.Sitemap = offers.map(offer => ({
      url: `${baseUrl}/oferta/${offer.offerId}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }))

    return [...staticUrls, ...offerUrls]
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return staticUrls
  }
}
