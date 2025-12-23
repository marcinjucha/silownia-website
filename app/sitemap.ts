import { MetadataRoute } from "next"
import { fetchOfferListFromCMS } from "@/features/offer-list/logic/offer-list-repo"
import { fetchOfferListUseCase } from "@/features/offer-list/logic/offer-list-use-case"

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

  // Fetch offers without throwing errors
  const result = await fetchOfferListUseCase({ fetch: fetchOfferListFromCMS })

  if (!result.success) {
    console.error("Error generating sitemap:", result.error)
    return staticUrls
  }

  const offerUrls: MetadataRoute.Sitemap = result.value.map(offer => ({
    url: `${baseUrl}/oferta/${offer.offerId}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [...staticUrls, ...offerUrls]
}
