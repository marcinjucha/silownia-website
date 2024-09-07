import { z, ZodEffects, ZodError } from "zod"

class ApplicationFormValidationError extends Error {
  constructor(public message: string) {
    super(message)
    this.name = "ApplicationFormValidation"
  }
}

export class ApplicationForm {
  private _name: string
  private _email: string
  private _age: number

  get name(): string {
    return this._name
  }

  get email(): string {
    return this._email
  }

  get age(): number {
    return this._age
  }

  constructor({ name, email, age }: { name: string; email: string; age: number }) {
    this._name = name
    this._email = email
    this._age = age
  }

  validate() {
    const applicationSchema = z.object({
      name: z.string(),
      email: z.string().email("Invalid email format"),
      age: z.coerce.number().min(18, "Age must be at least 18"),
    })

    try {
      applicationSchema.parse(this)
    } catch (err) {
      const error = err as ZodError
      const errors = error.errors.map(error => error.message).join(";")
      throw new ApplicationFormValidationError(errors)
    }
  }
}
