import { MinLengthFieldError } from '@errors/min-length-field-error'
import { type FieldValidation } from '@protocols/field-validation'

/**
 * A {@link FieldValidation} implementation to validate a field has a given minimum length.
 */
export class MinLengthValidation implements FieldValidation {
  constructor(
    private readonly minLength: number,
    private readonly message?: string,
    public error: Error | null = null
  ) {}

  /**
   * Validates that the input value is equal or greater than the minLength.
   * @param inputValue The input value to validate.
   * @param field  The name of the field to validate.
   * @returns MinLengthFieldError | null
   */
  validate(inputValue: any, field: string): Error | null {
    if (inputValue && inputValue.length < this.minLength) {
      this.error = new MinLengthFieldError(field, this.minLength, this.message)
    }
    return this.error
  }
}
