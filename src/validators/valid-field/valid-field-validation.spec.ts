import faker from '@faker-js/faker'
import { InvalidFieldError } from '@errors/invalid-field-error'
import { ValidFieldValidation } from '.'

describe('ValidFieldValidation', () => {
  let sut: ValidFieldValidation
  const field = faker.random.numeric()
  /**
   * UUID regex pattern.
   */
  const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

  test('Should return error if value is invalid without custom message', () => {
    sut = new ValidFieldValidation(pattern)
    const error = sut.validate(faker.random.alphaNumeric(4), field)
    expect(error).toEqual(new InvalidFieldError(field))
    expect(error?.message).toBe(`${field} is invalid`)
  })

  test('Should return error if value is invalid with custom message', () => {
    const message = 'The field does not match the regex pattern'
    sut = new ValidFieldValidation(pattern, message)
    const error = sut.validate(faker.random.alphaNumeric(4), field)
    expect(error).toEqual(new InvalidFieldError(field, message))
    expect(error?.message).toBe(message)
  })

  test('Should return falsy is value is valid', () => {
    sut = new ValidFieldValidation(pattern)
    const error = sut.validate('3582e85c-9aaf-446a-ba60-d2d6caf8ab4f', field)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy is value is valid', () => {
    sut = new ValidFieldValidation(pattern)
    let error = sut.validate(faker.random.alphaNumeric(4), field)
    expect(error).toEqual(new InvalidFieldError(field))
    expect(error?.message).toBe(`${field} is invalid`)

    error = sut.validate('3582e85c-9aaf-446a-ba60-d2d6caf8ab4f', field)
    expect(error).toBeFalsy()
  })
})
