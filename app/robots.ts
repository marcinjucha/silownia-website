import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.HOST_URL

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/*", "/checkout/*", "/_next/*", "/admin/*"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: ["/api/*", "/checkout/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
