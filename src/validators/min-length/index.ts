import { MinLengthFieldError } from '@errors/min-length-field-error'
import { type FieldValidation } from '@protocols/field-validation'

/**
 * A {@link FieldValidation} implementation to validate a field has a given minimum length.
 */
export class MinLengthValidation implements FieldValidation {
  constructor(
    private readonly minLength: number,
    private readonly message?: string
  ) {}

  /**
   * Validates that the input value is equal or greater than the minLength.
   * @param inputValue The input value to validate.
   * @param field  The name of the field to validate.
   * @returns MinLengthFieldError | undefined
   */
  validate(inputValue: any, field: string): Error {
    return (
      inputValue &&
      inputValue.length < this.minLength &&
      new MinLengthFieldError(field, this.minLength, this.message)
    )
  }
}
