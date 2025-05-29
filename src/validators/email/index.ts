import { EmailFieldError } from '@errors/email-field-error'
import { type FieldValidation } from '@protocols/field-validation'

/**
 * A {@link FieldValidation} implementation to validate an email field.
 */
export class EmailValidation implements FieldValidation {
  constructor(private readonly message?: string) {}
  /**
   * Validates that the input value is a valid email.
   * @param inputValue The input value to validate
   * @param field The name of the field to validate.
   * @returns EmailFieldError | undefined
   */
  validate(inputValue: string, field: string): Error | undefined {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g
    if (!regex.test(inputValue)) {
      return new EmailFieldError(field, this.message)
    }
  }
}
