import faker from '@faker-js/faker'
import { RequiredFieldError } from '@errors/required-field-error'
import { RequiredFieldValidation } from '.'

describe('RequiredFieldValidation', () => {
  let sut: RequiredFieldValidation
  const field = faker.random.word()

  beforeEach(() => {
    sut = new RequiredFieldValidation()
  })

  test('Should return error without custom message if field is empty', () => {
    const error = sut.validate('', field)
    expect(error).toEqual(new RequiredFieldError(field))
    expect(error?.message).toBe(`${field} is Required`)
  })

  test('Should return error with custom message if field is empty', () => {
    const customErrorMessage = 'This field is required.'
    sut = new RequiredFieldValidation(customErrorMessage)
    const error = sut.validate('', field)
    expect(error).toEqual(new RequiredFieldError(field, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if field is not empty', () => {
    const error = sut.validate(faker.random.word(), field)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy if field is not empty', () => {
    let error = sut.validate('', field)
    expect(error).toEqual(new RequiredFieldError(field))
    expect(error?.message).toBe(`${field} is Required`)

    error = sut.validate(faker.random.word(), field)
    expect(error).toBeFalsy()
  })
})
