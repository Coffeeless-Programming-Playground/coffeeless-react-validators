import { type FieldValidation } from '@protocols/field-validation'

export class ValidationComposite implements FieldValidation {
  private readonly errors: Error[] = []
  constructor(private readonly validations: FieldValidation[]) {}

  validate(inputValue: any, field: string): undefined {
    for (const validation of this.validations) {
      const error = validation.validate(inputValue, field)
      if (error) {
        this.errors.push(error)
      }
    }
    return undefined
  }

  getErrors() {
    return this.errors
  }
}
