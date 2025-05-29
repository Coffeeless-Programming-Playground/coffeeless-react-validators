import faker from '@faker-js/faker'
import { EmailValidation } from '@validators/email'
import { MinLengthValidation } from '@validators/min-length'
import { RequiredFieldValidation } from '@validators/required-field'
import { ValidFieldValidation } from '@validators/valid-field'
import { ValidationBuilder } from './validation-builder'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.init().required().build()
    expect(validations).toEqual([new RequiredFieldValidation()])
  })

  test('Should return RequiredFieldValidation with custom message', () => {
    const customErrorMessage = 'This field is required'
    const validations = ValidationBuilder.init().required(customErrorMessage).build()
    expect(validations).toEqual([new RequiredFieldValidation(customErrorMessage)])
  })

  test('Should return MinLengthValidation', () => {
    const length = faker.datatype.number()
    const validations = ValidationBuilder.init().min(length).build()
    expect(validations).toEqual([new MinLengthValidation(length)])
  })

  test('Should return MinLengthValidation with custom message', () => {
    const customErrorMessage = 'This field does not meet the min length constraint'
    const length = faker.datatype.number()
    const validations = ValidationBuilder.init().min(length, customErrorMessage).build()
    expect(validations).toEqual([new MinLengthValidation(length, customErrorMessage)])
  })

  test('Should return Emailvalidation', () => {
    const validations = ValidationBuilder.init().email().build()
    expect(validations).toEqual([new EmailValidation()])
  })

  test('Should return Emailvalidation with custom message', () => {
    const customErrorMessage = 'Email is not valid'
    const validations = ValidationBuilder.init().email(customErrorMessage).build()
    expect(validations).toEqual([new EmailValidation(customErrorMessage)])
  })

  test('Should return ValidFieldValidation', () => {
    const pattern = /^[0-1]/
    const validations = ValidationBuilder.init().valid(pattern).build()
    expect(validations).toEqual([new ValidFieldValidation(pattern)])
  })

  test('Should return ValidFieldValidation with custom message', () => {
    const customErrorMessage = 'This field does not match regex pattern'
    const pattern = /^[0-1]/
    const validations = ValidationBuilder.init().valid(pattern, customErrorMessage).build()
    expect(validations).toEqual([new ValidFieldValidation(pattern, customErrorMessage)])
  })

  test('Should return a list of validations', () => {
    const length = faker.datatype.number()
    const pattern = /^[0-1]/
    const validations = ValidationBuilder.init()
      .required()
      .min(length)
      .email()
      .valid(pattern)
      .build()
    expect(validations).toEqual([
      new RequiredFieldValidation(),
      new MinLengthValidation(length),
      new EmailValidation(),
      new ValidFieldValidation(pattern)
    ])
  })
})
