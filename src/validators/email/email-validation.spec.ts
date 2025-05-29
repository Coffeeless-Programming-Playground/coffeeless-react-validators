import faker from '@faker-js/faker'
import { EmailFieldError } from '@errors/email-field-error'
import { EmailValidation } from '.'

describe('EmailValidation', () => {
  let sut: EmailValidation
  const field = faker.random.word()

  beforeEach(() => {
    sut = new EmailValidation()
  })

  test('Should return error without custom message if value is invalid', () => {
    const error = sut.validate(faker.random.word(), field)
    expect(error).toEqual(new EmailFieldError(field))
    expect(error?.message).toBe(`${field} is not valid`)
  })

  test('Should return error with custom message if value is invalid', () => {
    const customErrorMessage = 'Input field is not an email'
    sut = new EmailValidation(customErrorMessage)
    const error = sut.validate(faker.random.word(), field)
    expect(error).toEqual(new EmailFieldError(field, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if value is valid', () => {
    const error = sut.validate('dominicsc2hs@gmail.com', field)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy when email is valid', () => {
    let error = sut.validate(faker.random.word(), field)
    expect(error).toEqual(new EmailFieldError(field))
    expect(error?.message).toBe(`${field} is not valid`)

    error = sut.validate('dominicsc2hs@gmail.com', field)
    expect(error).toBeFalsy()
  })
})
