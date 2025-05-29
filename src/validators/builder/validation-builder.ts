import { type FieldValidation } from '@protocols/field-validation'
import { EmailValidation } from '@validators/email'
import { MinLengthValidation } from '@validators/min-length'
import { RequiredFieldValidation } from '@validators/required-field'
import { ValidFieldValidation } from '@validators/valid-field'

/**
 * Builder class that implements the Builder pattern to add validation rules meant to be use for schema/input validation.
 */
export class ValidationBuilder {
  private constructor(private readonly validations: FieldValidation[]) {}

  /**
   * Initialized the validator array to add validation rules
   * @returns ValidationBuilder
   */
  static init(): ValidationBuilder {
    return new ValidationBuilder([])
  }

  /**
   * Sets a field as required
   * @returns ValidationBuilder
   */
  required(message?: string): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(message))
    return this
  }

  /**
   * Sets the minimum length of characters a field should contain
   * @param length number parameter. Represents minimum length of the input
   * @returns ValidationBuilder
   */
  min(length: number, message?: string): ValidationBuilder {
    this.validations.push(new MinLengthValidation(length, message))
    return this
  }

  /**
   * Verifies email being valid
   * @param message An optional message to display error text
   * @returns ValidationBuilder
   */
  email(message?: string): ValidationBuilder {
    this.validations.push(new EmailValidation(message))
    return this
  }

  /**
   * Validates that a given input matches a regex pattern.
   * @param pattern A regex pattern {@link RegExp}
   * @param message An optional message to display error text
   * @returns ValidFieldValidation
   */
  valid(pattern: RegExp, message?: string): ValidationBuilder {
    this.validations.push(new ValidFieldValidation(pattern, message))
    return this
  }

  /**
   * Return all of the validations as an array to be used for the validationSchema
   * @returns FieldValidation array
   */
  build(): FieldValidation[] {
    return this.validations
  }
}
