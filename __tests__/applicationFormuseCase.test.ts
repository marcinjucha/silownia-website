import { ApplicationFormDTO } from "@/repositories/applicationFormRepo"
import { applicationFormSubmitUseCase } from "@/use-cases/applicationFormUseCase"

describe("Application Form Submit Use Case", () => {
  const mockSave = jest.fn().mockResolvedValue(undefined)
  it("should return a success message when the form is saved successfully", async () => {
    const applicationFormData: ApplicationFormDTO = {
      name: "John Doe",
      email: "john@example.com",
      age: 25,
    }

    const result = await applicationFormSubmitUseCase(
      { save: mockSave },
      { applicationForm: applicationFormData },
    )

    expect(result).toEqual({ message: "Application saved successfully" })
  })

  it("should fail due to invalid age", async () => {
    const applicationFormData: ApplicationFormDTO = {
      name: "John Doe",
      email: "john@example.com",
      age: 17,
    }

    await expect(
      applicationFormSubmitUseCase({ save: mockSave }, { applicationForm: applicationFormData }),
    ).rejects.toThrow("Age must be at least 18")
  })

  it("should fail due to invalid email", async () => {
    const applicationFormData: ApplicationFormDTO = {
      name: "John Doe",
      email: "johnexample.com",
      age: 18,
    }

    await expect(
      applicationFormSubmitUseCase({ save: mockSave }, { applicationForm: applicationFormData }),
    ).rejects.toThrow("Invalid email format")
  })
})
