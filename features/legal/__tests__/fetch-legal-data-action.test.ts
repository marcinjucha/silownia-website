import { describe, it, expect, vi, beforeEach } from "vitest"
import { fetchPrivacyTerms, fetchRegulamin } from "../actions/fetch-legal-data-action"
import * as legalUseCase from "../logic/legal-use-case"
import { clientValue, clientError } from "@/lib/error-handling"
import { LegalDTO } from "../logic/legal-type"
import * as nextNavigation from "next/navigation"

// Mock use case'ów
vi.mock("../logic/legal-use-case")

describe("Legal Data Actions", () => {
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

  describe("fetchPrivacyTerms", () => {
    it("should return legal data when successful", async () => {
      // Arrange
      vi.mocked(legalUseCase.fetchPrivacyTermsUseCase).mockResolvedValue(clientValue(mockLegalData))

      // Act
      const result = await fetchPrivacyTerms()

      // Assert
      expect(result).toEqual(mockLegalData)
      expect(legalUseCase.fetchPrivacyTermsUseCase).toHaveBeenCalledTimes(1)
      expect(nextNavigation.notFound).not.toHaveBeenCalled()
    })

    it("should call notFound when fetch fails", async () => {
      // Arrange
      vi.mocked(legalUseCase.fetchPrivacyTermsUseCase).mockResolvedValue(clientError("Błąd"))

      // Act
      await fetchPrivacyTerms()

      // Assert
      expect(nextNavigation.notFound).toHaveBeenCalledTimes(1)
      expect(legalUseCase.fetchPrivacyTermsUseCase).toHaveBeenCalledTimes(1)
    })
  })

  describe("fetchRegulamin", () => {
    it("should return legal data when successful", async () => {
      // Arrange
      vi.mocked(legalUseCase.fetchRegulaminUseCase).mockResolvedValue(clientValue(mockLegalData))

      // Act
      const result = await fetchRegulamin()

      // Assert
      expect(result).toEqual(mockLegalData)
      expect(legalUseCase.fetchRegulaminUseCase).toHaveBeenCalledTimes(1)
      expect(nextNavigation.notFound).not.toHaveBeenCalled()
    })

    it("should call notFound when fetch fails", async () => {
      // Arrange
      vi.mocked(legalUseCase.fetchRegulaminUseCase).mockResolvedValue(clientError("Błąd"))

      // Act
      await fetchRegulamin()

      // Assert
      expect(nextNavigation.notFound).toHaveBeenCalledTimes(1)
      expect(legalUseCase.fetchRegulaminUseCase).toHaveBeenCalledTimes(1)
    })
  })
})
