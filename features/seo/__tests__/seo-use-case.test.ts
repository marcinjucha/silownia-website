import { describe, it, expect, vi } from "vitest"
import { fetchSEOMetadataUseCase } from "../logic/seo-use-case"
import { fetchSeoFromCMS } from "../logic/seo-repo" // REAL repository function
import { graphqlFetch } from "@/lib/graph-ql/fetch-client" // Already mocked globally
import { createMockSeoGraphQLResponse, createMockEmptySeoGraphQLResponse } from "./seo-test-utils"

describe("SEO Use Cases", () => {
  describe("fetchSEOMetadataUseCase", () => {
    it("should process SEO data successfully and return ClientResult", async () => {
      // Arrange
      vi.mocked(graphqlFetch).mockResolvedValue(createMockSeoGraphQLResponse())

      const context = {
        fetch: fetchSeoFromCMS, // REAL repository function
      }

      // Act
      const result = await fetchSEOMetadataUseCase(context)

      // Assert
      expect(result.isFailure).toBe(false)
      if (!result.isFailure) {
        expect(result.value.title).toBe("Test Title")
        expect(result.value.description).toBe("Test Description for SEO testing purposes")
        expect(result.value.keywords).toEqual(["test", "seo", "keywords"])
        expect(result.value.alternates?.canonical).toBe("https://test.com")
        expect(result.value.openGraph?.title).toBe("OG Test Title")
        expect(result.value.metadataBase).toBeInstanceOf(URL)
      }
      expect(graphqlFetch).toHaveBeenCalledTimes(1)
    })

    it("should handle external API failures and return ClientResult error", async () => {
      // Arrange - Mock GraphQL error
      vi.mocked(graphqlFetch).mockRejectedValue(new Error("GraphQL failed"))

      const context = {
        fetch: fetchSeoFromCMS, // REAL repository function
      }

      // Act
      const result = await fetchSEOMetadataUseCase(context)

      // Assert
      expect(result.isFailure).toBe(true)
      if (result.isFailure) {
        expect(result.error).toBe("Failed to fetch SEO metadata from CMS")
      }
      expect(graphqlFetch).toHaveBeenCalledTimes(1)
    })

    it("should handle missing SEO data from CMS", async () => {
      // Arrange
      vi.mocked(graphqlFetch).mockResolvedValue(createMockEmptySeoGraphQLResponse())

      const context = {
        fetch: fetchSeoFromCMS, // REAL repository function
      }

      // Act
      const result = await fetchSEOMetadataUseCase(context)

      // Assert
      expect(result.isFailure).toBe(true)
      if (result.isFailure) {
        expect(result.error).toBe("Failed to fetch SEO metadata from CMS")
      }
      expect(graphqlFetch).toHaveBeenCalledTimes(1)
    })
  })
})
