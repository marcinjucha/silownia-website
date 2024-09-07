import { ApplicationForm } from "@/entities/ApplicationForm"

export type ApplicationFormDTO = {
  name: string
  email: string
  age: number
}

export function mapApplicationFormToDTO(form: ApplicationForm): ApplicationFormDTO {
  return form
}

export async function saveApplicationForm(applicationForm: ApplicationFormDTO) {
  // fetch data from the cms or db
  // const cms = {
  //   id, name, createdDate, email, age, salary, payments, cos innego
  // }
  return Promise.resolve()
}
