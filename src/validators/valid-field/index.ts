import { InvalidFieldError } from '@errors/invalid-field-error'
import { type FieldValidation } from '@protocols/field-validation'

/**
 * A {@link FieldValidation} implementation to validate a field.
 */
export class ValidFieldValidation implements FieldValidation {
  constructor(
    private readonly pattern: RegExp,
    private readonly message?: string
  ) {}

  /**
   * Validates that a given input matches a regex pattern.
   * @param inputValue The input value to validate.
   * @param field The field name being validated
   * @returns InvalidFieldError | undefined
   */
  validate(inputValue: any, field: string): Error {
    return (
      inputValue && !this.pattern.test(inputValue) && new InvalidFieldError(field, this.message)
    )
  }
}
