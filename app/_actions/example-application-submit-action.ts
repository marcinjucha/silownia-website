"use server"

import { saveApplicationForm } from "@/repositories/applicationFormRepo"
import { applicationFormSubmitUseCase } from "@/use-cases/applicationFormUseCase"

export async function submitForm(prevState: any, formData: FormData) {
  const fields = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    age: parseInt(formData.get("age") as string),
  }

  const message = await applicationFormSubmitUseCase(
    {
      save: saveApplicationForm,
    },
    { applicationForm: fields },
  )

  return message
}
