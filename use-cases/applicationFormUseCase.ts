import { ApplicationForm } from "@/entities/ApplicationForm"
import { ApplicationFormDTO, mapApplicationFormToDTO } from "@/repositories/applicationFormRepo"

export type SaveApplicationForm = (applicationForm: ApplicationFormDTO) => Promise<void>

export async function applicationFormSubmitUseCase(
  context: { save: SaveApplicationForm },
  data: { applicationForm: ApplicationFormDTO },
) {
  const form = new ApplicationForm(data.applicationForm)

  form.validate()

  await context.save(mapApplicationFormToDTO(form))

  return {
    message: "Application saved successfully",
  }
}
