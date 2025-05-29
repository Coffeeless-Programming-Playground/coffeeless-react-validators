/**
 * Contract for any field validation class.
 */
export interface FieldValidation {
  /**
   * Validates a field based on a given rule.
   * @param inputValue The input value to validate.
   * @param field The name of the field to validate.
   */
  validate: (inputValue: any, field: string) => Error | undefined
}
