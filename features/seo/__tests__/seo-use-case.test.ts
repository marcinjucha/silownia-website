import { describe, it, expect, vi, beforeEach } from "vitest"
import { fetchSEOMetadataUseCase } from "../logic/seo-use-case"
import { SEOMetadataDTO } from "../logic/seo-type"
import { fetchSeoFromCMS } from "../logic/seo-repo"
import client from "@/lib/graph-ql/client"
import { createApolloResponse } from "@/features/__tests__/test-utils"

describe("SEO Use Cases", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe("fetchSEOMetadataUseCase", () => {
    it("should return SEO metadata from fetch function when successful", async () => {
      // Arrange
      const mockSEOData: SEOMetadataDTO = {
        title: "Test Title",
        description: "Test Description",
        keywords: "test, keywords",
        canonical: "https://test.com",
        openGraph: {
          title: "OG Test Title",
          description: "OG Test Description",
          type: "website",
          url: "https://test.com",
          image: {
            url: "/test-image.jpg",
            width: 1200,
            height: 630,
            alt: "Test Image",
          },
        },
      }

      const mockFetch = vi.fn().mockResolvedValue(mockSEOData)

      // Act
      const result = await fetchSEOMetadataUseCase({ fetch: mockFetch })

      // Assert
      expect(result).toEqual(mockSEOData)
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it("should return fallback SEO metadata when fetch function fails", async () => {
      // Arrange
      const mockFetch = vi.fn().mockRejectedValue(new Error("Failed to fetch SEO metadata"))

      // Act
      const result = await fetchSEOMetadataUseCase({ fetch: mockFetch })

      // Assert
      expect(result).toHaveProperty("title", "Progress Gym Wrocław")
      expect(result).toHaveProperty("description")
      expect(result).toHaveProperty("keywords")
      expect(result).toHaveProperty("canonical", "https://progressgymacademy.pl")
      expect(result.openGraph).toHaveProperty("title")
      expect(result.openGraph).toHaveProperty("description")
      expect(result.openGraph).toHaveProperty("type", "website")
      expect(result.openGraph).toHaveProperty("url", "https://progressgymacademy.pl")
      expect(result.openGraph.image).toHaveProperty("url", "/public/logozlote.png")
      expect(result.openGraph.image).toHaveProperty("width", 500)
      expect(result.openGraph.image).toHaveProperty("height", 500)
      expect(result.openGraph.image).toHaveProperty("alt", "Logo Progress Gym Wrocław")
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it("should integrate with seo repo and Apollo Client correctly", async () => {
      // Arrange
      const mockSEOData = {
        seos: [
          {
            title: "Test Title",
            description: "Test Description",
            keywords: "test, keywords",
            canonical: "https://test.com",
            openGraph: {
              title: "OG Test Title",
              description: "OG Test Description",
              type: "website",
              url: "https://test.com",
              image: {
                alternativeText: "Test Image",
                width: 1200,
                height: 630,
                url: "/test-image.jpg",
                formats: {
                  large: {
                    url: "/test-image-large.jpg",
                    width: 1200,
                    height: 630,
                  },
                  medium: {
                    url: "/test-image-medium.jpg",
                    width: 750,
                    height: 394,
                  },
                  small: {
                    url: "/test-image-small.jpg",
                    width: 500,
                    height: 263,
                  },
                  thumbnail: {
                    url: "/test-image-thumbnail.jpg",
                    width: 250,
                    height: 131,
                  },
                },
              },
            },
          },
        ],
      }

      vi.mocked(client.query).mockResolvedValue(createApolloResponse(mockSEOData))

      // Act
      const result = await fetchSEOMetadataUseCase({ fetch: fetchSeoFromCMS })

      // Assert
      expect(result).toHaveProperty("title", "Test Title")
      expect(result).toHaveProperty("description", "Test Description")
      expect(result.openGraph.image).toHaveProperty("url", "/test-image.jpg")
      expect(client.query).toHaveBeenCalledTimes(1)
    })
  })
})
