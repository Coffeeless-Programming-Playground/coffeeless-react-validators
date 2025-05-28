import { InvalidFieldError } from '@errors/invalid-field-error'
import { type FieldValidation } from '@protocols/field-validation'

/**
 * A {@link FieldValidation} implementation to validate a field.
 */
export class ValidFieldValidation implements FieldValidation {
  constructor(
    private readonly pattern: RegExp,
    private readonly message?: string,
    public error: Error | null = null
  ) {}

  /**
   * Validates that a given input matches a regex pattern.
   * @param inputValue The input value to validate.
   * @param field The field name being validated
   * @returns InvalidFieldError | null
   */
  validate(inputValue: any, field: string): Error | null {
    if (inputValue && !this.pattern.test(inputValue)) {
      this.error = new InvalidFieldError(field, this.message)
    }
    return this.error
  }
}
