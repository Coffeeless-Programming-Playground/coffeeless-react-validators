export class RequiredFieldError extends Error {
  constructor(fieldName: string, message?: string) {
    super(`${message ?? `${fieldName} is Required`}`)
    this.name = 'RequiredFieldError'
  }
}
