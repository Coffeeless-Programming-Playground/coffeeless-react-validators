import { EmailFieldError } from '@errors/email-field-error'
import { type FieldValidation } from '@protocols/field-validation'

/**
 * A {@link FieldValidation} implementation to validate an email field.
 */
export class Emailvalidation implements FieldValidation {
  constructor(
    private readonly message?: string,
    public error: Error | null = null
  ) {}

  /**
   * Validates that the input value is a valid email.
   * @param inputValue The input value to validate
   * @param field The name of the field to validate.
   * @returns EmailFieldError | null
   */
  validate(inputValue: string, field: string): Error | null {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g
    if (!regex.test(inputValue)) {
      this.error = new EmailFieldError(field, this.message)
    }
    return this.error
  }
}
