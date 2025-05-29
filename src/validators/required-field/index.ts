import { RequiredFieldError } from '@errors/required-field-error'
import { type FieldValidation } from '@protocols/field-validation'

/**
 * A {@link FieldValidation} implementation to validate a field is required.
 */
export class RequiredFieldValidation implements FieldValidation {
  constructor(private readonly message?: string) {}
  /**
   * Validates a field is not empty
   * @param inputValue The input valure to validate.
   * @param field The name of the field to validate.
   * @returns RequiredFieldError | undefined
   */
  validate(inputValue: any, field: string): Error | undefined {
    if (!inputValue) {
      return new RequiredFieldError(field, this.message)
    }
  }
}
