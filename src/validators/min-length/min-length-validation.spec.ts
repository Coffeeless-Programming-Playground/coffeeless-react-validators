import faker from '@faker-js/faker'
import { MinLengthFieldError } from '@errors/min-length-field-error'
import { MinLengthValidation } from '.'

describe('MinLengthValidation', () => {
  let sut: MinLengthValidation
  const field = faker.random.word()
  const minLength = 5

  beforeEach(() => {
    sut = new MinLengthValidation(minLength)
  })

  test('Should return error without custom message if value is invalid', () => {
    const error = sut.validate(faker.random.alphaNumeric(minLength - 1), field)
    expect(error).toEqual(new MinLengthFieldError(field, minLength))
    expect(error?.message).toBe(`${field} must be ${minLength} characters at least`)
  })

  test('Should return error with custom message if value is invalid', () => {
    const customErrorMessage = 'The field does not meet the minimum length contraint.'
    sut = new MinLengthValidation(minLength, customErrorMessage)
    const error = sut.validate(faker.random.alphaNumeric(minLength - 1), field)
    expect(error).toEqual(new MinLengthFieldError(field, minLength, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if field length is greater than min length', () => {
    const error = sut.validate(faker.random.alphaNumeric(minLength + 1), field)
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field length is equal to min length', () => {
    const error = sut.validate(faker.random.alphaNumeric(minLength), field)
    expect(error).toBeFalsy()
  })
})
