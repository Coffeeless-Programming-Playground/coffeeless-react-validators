/**
 * Contract for any field validation class.
 */
export interface FieldValidation {
  /**
   * Error return by the field which the client can leverage in their own business logic.
   */
  error: Error | null
  /**
   * Validates a field based on a given rule.
   * @param inputValue The input value to validate.
   * @param field The name of the field to validate.
   */
  validate: (inputValue: any, field: string) => Error | null
}
