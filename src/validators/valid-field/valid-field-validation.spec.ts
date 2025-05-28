import faker from '@faker-js/faker'
import { InvalidFieldError } from '@errors/invalid-field-error'
import { ValidFieldValidation } from '.'

describe('ValidFieldValidation', () => {
  let sut: ValidFieldValidation
  const field = faker.random.numeric()
  /**
   * regex pattern that looks for 3 numbers followed by 2 strings.
   */
  const pattern = /^\d{3}[A-Za-z]{2}$/

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
    const error = sut.validate('123df', field)
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

    error = sut.validate('123df', field)
    expect(error).toBeFalsy()
  })
})
