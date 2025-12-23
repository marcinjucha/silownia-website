import { graphqlFetch } from "@/lib/graph-ql/fetch-client" // Already mocked globally
import { describe, expect, it, vi } from "vitest"
import { fetchJsonLdFromCMS } from "../logic/json-ld-repo" // REAL repository function
import { fetchJsonLdUseCase } from "../logic/json-ld-use-case"
import {
  createMockEmptyJsonLdGraphQLResponse,
  createMockJsonLdGraphQLResponse,
  createMockMixedJsonLdGraphQLResponse,
} from "./seo-test-utils"

describe("JSON-LD Use Cases", () => {
  describe("fetchJsonLdUseCase", () => {
    it("should process JSON-LD data successfully and return ClientResult", async () => {
      // Arrange
      vi.mocked(graphqlFetch).mockResolvedValue(createMockJsonLdGraphQLResponse())

      const context = {
        fetch: fetchJsonLdFromCMS, // REAL repository function
      }

      // Act
      const result = await fetchJsonLdUseCase(context)

      // Assert
      expect(result.isFailure).toBe(false)
      if (!result.isFailure) {
        expect(Array.isArray(result.value)).toBe(true)
        expect(result.value.length).toBeGreaterThan(0)

        const firstItem = result.value[0]
        expect(firstItem["@context"]).toBe("https://schema.org")
        expect(firstItem["@type"]).toBe("Article")
        expect(firstItem).toHaveProperty("headline", "Test Article Headline")
        expect(firstItem).toHaveProperty(
          "description",
          "Test article description for JSON-LD testing",
        )
      }
      expect(graphqlFetch).toHaveBeenCalledTimes(1)
    })

    it("should handle external API failures and return ClientResult error", async () => {
      // Arrange - Mock GraphQL error
      vi.mocked(graphqlFetch).mockRejectedValue(new Error("GraphQL failed"))

      const context = {
        fetch: fetchJsonLdFromCMS, // REAL repository function
      }

      // Act
      const result = await fetchJsonLdUseCase(context)

      // Assert
      expect(result.isFailure).toBe(true)
      if (result.isFailure) {
        expect(result.error).toBe("Failed to fetch JSON-LD from CMS")
      }
      expect(graphqlFetch).toHaveBeenCalledTimes(1)
    })

    it("should handle missing JSON-LD data from CMS", async () => {
      // Arrange
      vi.mocked(graphqlFetch).mockResolvedValue(createMockEmptyJsonLdGraphQLResponse())

      const context = {
        fetch: fetchJsonLdFromCMS, // REAL repository function
      }

      // Act
      const result = await fetchJsonLdUseCase(context)

      // Assert
      expect(result.isFailure).toBe(false)
      if (!result.isFailure) {
        expect(Array.isArray(result.value)).toBe(true)
        expect(result.value.length).toBe(0)
      }
      expect(graphqlFetch).toHaveBeenCalledTimes(1)
    })

    it("should handle mixed JSON-LD types successfully", async () => {
      // Arrange
      vi.mocked(graphqlFetch).mockResolvedValue(createMockMixedJsonLdGraphQLResponse())

      const context = {
        fetch: fetchJsonLdFromCMS, // REAL repository function
      }

      // Act
      const result = await fetchJsonLdUseCase(context)

      // Assert
      expect(result.isFailure).toBe(false)
      if (!result.isFailure) {
        expect(Array.isArray(result.value)).toBe(true)
        expect(result.value.length).toBe(3) // Article, Product, Person

        // Check that we have different types
        const types = result.value.map(item => item["@type"])
        expect(types).toContain("Article")
        expect(types).toContain("Product")
        expect(types).toContain("Person")

        // Verify all items have proper schema.org context
        result.value.forEach(item => {
          expect(item["@context"]).toBe("https://schema.org")
          expect(item["@type"]).toBeTruthy()
        })
      }
      expect(graphqlFetch).toHaveBeenCalledTimes(1)
    })
  })
})
