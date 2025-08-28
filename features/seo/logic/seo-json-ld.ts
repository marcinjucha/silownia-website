import { SEOJsonLdDTO } from "./seo-type"

// keep just for reference
export function generateProgressGymJsonLd(): SEOJsonLdDTO {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Progress Gym Wrocław",
    description:
      "Nowoczesna siłownia i klub fitness przy ul. Paprotnej 14A. Siłownia 1800 m², sztuki walki, fitness, pole dance, akrobatyka i strefa relaksu",
    url: process.env.HOST_URL || "https://progressgymacademy.pl",
    logo: `${process.env.HOST_URL || "https://progressgymacademy.pl"}/logozlote.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Paprotna 14A",
      addressLocality: "Wrocław",
      postalCode: "51-117",
      addressCountry: "PL",
    },
    telephone: "+48 123 456 789", // Dodaj prawdziwy numer
    openingHours: ["Mo-Fr 06:00-23:00", "Sa-Su 08:00-22:00"],
    sameAs: [
      "https://www.facebook.com/progressgym", // Dodaj prawdziwe linki
      "https://www.instagram.com/progressgym",
      "https://www.youtube.com/progressgym",
    ],
  }
}

export function generateArticleJsonLd(
  title: string,
  description: string,
  url: string,
  imageUrl: string,
): SEOJsonLdDTO {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    name: title,
    description,
    url,
    logo: imageUrl,
  }
}
