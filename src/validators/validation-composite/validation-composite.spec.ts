import faker from '@faker-js/faker'
import { mock, MockProxy } from 'jest-mock-extended'
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidFieldValidation,
  ValidationComposite
} from '@validators/index'
import { EmailFieldError } from '@errors/email-field-error'
import { MinLengthFieldError } from '@errors/min-length-field-error'
import { RequiredFieldError } from '@errors/required-field-error'
import { InvalidFieldError } from '@errors/invalid-field-error'

describe('ValidationComposite', () => {
  const anyField = faker.random.word()
  const anyValue = faker.random.word()
  let sut: ValidationComposite
  let emailValidation: MockProxy<EmailValidation>
  let minLengthValidation: MockProxy<MinLengthValidation>
  let requiredFieldValidation: MockProxy<RequiredFieldValidation>
  let validFieldValidation: MockProxy<ValidFieldValidation>

  beforeAll(() => {
    emailValidation = mock()
    minLengthValidation = mock()
    requiredFieldValidation = mock()
    validFieldValidation = mock()
    sut = new ValidationComposite([
      emailValidation,
      minLengthValidation,
      requiredFieldValidation,
      validFieldValidation
    ])
  })

  test('Should return an empty list of errors', () => {
    sut.validate(anyValue, anyField)
    expect(sut.getErrors()).toEqual([])
    expect(emailValidation.validate).toHaveBeenCalledWith(anyValue, anyField)
    expect(minLengthValidation.validate).toHaveBeenCalledWith(anyValue, anyField)
    expect(requiredFieldValidation.validate).toHaveBeenCalledWith(anyValue, anyField)
    expect(validFieldValidation.validate).toHaveBeenCalledWith(anyValue, anyField)
  })

  test('Should return a populated list of errors if any of the dependencies returns an exception', () => {
    emailValidation.validate.mockReturnValueOnce(new EmailFieldError(anyField))
    minLengthValidation.validate.mockReturnValueOnce(new MinLengthFieldError(anyField, 5))
    requiredFieldValidation.validate.mockReturnValueOnce(new RequiredFieldError(anyField))
    validFieldValidation.validate.mockReturnValueOnce(new InvalidFieldError(anyField))
    sut = new ValidationComposite([
      emailValidation,
      minLengthValidation,
      requiredFieldValidation,
      validFieldValidation
    ])
    sut.validate(anyValue, anyField)
    expect(sut.getErrors()).toEqual([
      new EmailFieldError(anyField),
      new MinLengthFieldError(anyField, 5),
      new RequiredFieldError(anyField),
      new InvalidFieldError(anyField)
    ])
    expect(emailValidation.validate).toHaveBeenCalledWith(anyValue, anyField)
    expect(minLengthValidation.validate).toHaveBeenCalledWith(anyValue, anyField)
    expect(requiredFieldValidation.validate).toHaveBeenCalledWith(anyValue, anyField)
    expect(validFieldValidation.validate).toHaveBeenCalledWith(anyValue, anyField)
  })
})
