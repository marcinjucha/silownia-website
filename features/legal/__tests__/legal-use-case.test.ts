import client from "@/lib/graph-ql/client"
import { clientError, clientValue } from "@/lib/error-handling"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { fetchPrivacyTermsFromCMS, fetchRegulaminFromCMS } from "../logic/legal-repo"
import { LegalDTO } from "../logic/legal-type"
import { fetchPrivacyTermsUseCase, fetchRegulaminUseCase } from "../logic/legal-use-case"
import { createApolloResponse } from "@/features/__tests__/test-utils"

describe("Legal Use Cases", () => {
  const mockLegalData: LegalDTO = {
    title: "Test Legal Title",
    description: "Test Legal Description",
    content: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Test content",
          },
        ],
      },
    ],
  }

  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe("fetchRegulaminUseCase", () => {
    it("should return legal data when fetch is successful", async () => {
      // Arrange
      const mockFetch = vi.fn().mockResolvedValue(mockLegalData)

      // Act
      const result = await fetchRegulaminUseCase({ fetch: mockFetch })

      // Assert
      expect(result).toEqual(clientValue(mockLegalData))
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it("should return error when fetch fails", async () => {
      // Arrange
      const mockFetch = vi.fn().mockRejectedValue(new Error("Failed to fetch"))

      // Act
      const result = await fetchRegulaminUseCase({ fetch: mockFetch })

      // Assert
      expect(result).toEqual(clientError("Błąd podczas pobierania danych regulaminu"))
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it("should integrate with legal repo and Apollo Client correctly", async () => {
      // Arrange
      const mockGraphQLResponse = {
        legalContents: [
          {
            title: "Test Legal Title",
            description: "Test Legal Description",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    type: "text",
                    text: "Test content",
                  },
                ],
              },
            ],
          },
        ],
      }

      vi.mocked(client.query).mockResolvedValue(createApolloResponse(mockGraphQLResponse))

      // Act
      const result = await fetchRegulaminUseCase({ fetch: fetchRegulaminFromCMS })

      // Assert
      expect(result).toEqual(clientValue(mockLegalData))
      expect(client.query).toHaveBeenCalledTimes(1)
    })
  })

  describe("fetchPrivacyTermsUseCase", () => {
    it("should return legal data when fetch is successful", async () => {
      // Arrange
      const mockFetch = vi.fn().mockResolvedValue(mockLegalData)

      // Act
      const result = await fetchPrivacyTermsUseCase({ fetch: mockFetch })

      // Assert
      expect(result).toEqual(clientValue(mockLegalData))
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it("should return error when fetch fails", async () => {
      // Arrange
      const mockFetch = vi.fn().mockRejectedValue(new Error("Failed to fetch"))

      // Act
      const result = await fetchPrivacyTermsUseCase({ fetch: mockFetch })

      // Assert
      expect(result).toEqual(clientError("Błąd podczas pobierania polityki prywatności"))
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    it("should integrate with legal repo and Apollo Client correctly", async () => {
      // Arrange
      const mockGraphQLResponse = {
        legalContents: [
          {
            title: "Test Legal Title",
            description: "Test Legal Description",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    type: "text",
                    text: "Test content",
                  },
                ],
              },
            ],
          },
        ],
      }

      vi.mocked(client.query).mockResolvedValue(createApolloResponse(mockGraphQLResponse))

      // Act
      const result = await fetchPrivacyTermsUseCase({ fetch: fetchPrivacyTermsFromCMS })

      // Assert
      expect(result).toEqual(clientValue(mockLegalData))
      expect(client.query).toHaveBeenCalledTimes(1)
    })
  })
})
