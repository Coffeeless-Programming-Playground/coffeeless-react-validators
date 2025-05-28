import faker from '@faker-js/faker'
import { EmailFieldError } from '@errors/email-field-error'
import { Emailvalidation } from '.'

describe('EmailValidation', () => {
  let sut: Emailvalidation
  const field = faker.random.word()

  beforeEach(() => {
    sut = new Emailvalidation()
  })

  test('Should return error without custom message if value is invalid', () => {
    const error = sut.validate(faker.random.word(), field)
    expect(error).toEqual(new EmailFieldError(field))
    expect(error?.message).toBe(`${field} is not valid`)
  })

  test('Should return error with custom message if value is invalid', () => {
    const customErrorMessage = 'Input field is not an email'
    sut = new Emailvalidation(customErrorMessage)
    const error = sut.validate(faker.random.word(), field)
    expect(error).toEqual(new EmailFieldError(field, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if value is valid', () => {
    const error = sut.validate('dominicsc2hs@gmail.com', field)
    expect(error).toBeFalsy()
  })
})
