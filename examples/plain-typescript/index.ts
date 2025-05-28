import faker from '@faker-js/faker'
import {
  ValidationBuilder as Builder,
  FieldValidation,
  InvalidFieldError,
  MinLengthFieldError,
  RequiredFieldError
} from 'coffeeless-validator/dist'
import { PersonDto } from './person-dto'

enum UserField {
  NAME = 'Name',
  LAST_NAME = 'Last name',
  PHONE_NUMBER = 'Phone number',
  EMAIL = 'Email'
}

class UserManagement {
  private errorMap = new Map<PersonDto, { field: UserField; error: Error }[]>()
  private static readonly MIN_NAME_LENGTH = 3
  private static readonly MIN_LAST_NAME_LENGTH = 5
  private static readonly PHONE_NUMBER_PATTERN = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/

  constructor(private readonly people: PersonDto[] = []) {}

  addPerson(personDto: PersonDto) {
    this.people.push(personDto)
  }

  /**
   * Validates each person fields caching the validators which are useful to test for applications
   * where the builders will be called once, but reused as a user types such as forms inputs. We want to ensure
   * that {@link FieldValidation} error state is internally removed when no errors are found, and added back when they are.
   */
  validatePeople() {
    this.people.forEach(person => {
      person.nameValidations =
        person.nameValidations ??
        Builder.init()
          .required('Name is required')
          .min(UserManagement.MIN_NAME_LENGTH, 'Name should have at least 3 characters')
          .build()
      person.lastNameValidations =
        person.lastNameValidations ??
        Builder.init()
          .required('Last name is required')
          .min(UserManagement.MIN_LAST_NAME_LENGTH)
          .build()
      person.phoneValidations =
        person.phoneValidations ??
        Builder.init()
          .valid(UserManagement.PHONE_NUMBER_PATTERN, 'Phone number is not correct')
          .build()
      person.emailValidations =
        person.emailValidations ?? Builder.init().email('Email is not correct').build()

      this.errorMap.set(person, [])

      this.executeValidation(person.nameValidations, person, person.getName(), UserField.NAME)
      this.executeValidation(
        person.lastNameValidations,
        person,
        person.getLastName(),
        UserField.LAST_NAME
      )
      this.executeValidation(
        person.phoneValidations,
        person,
        person.getPhoneNumber(),
        UserField.PHONE_NUMBER
      )
      this.executeValidation(person.emailValidations, person, person.getEmail(), UserField.EMAIL)
    })
  }

  /**
   * This method will fix the errors founds, and will allow a second round of validation to completely succeed.
   * This tests both that the validators are actually validating when requested, and that error state handling in
   * {@link FieldValidation} gets updated per request.
   */
  fixPeople() {
    this.people.forEach(person => {
      const fieldErrors = this.errorMap.get(person)
      fieldErrors.forEach(fieldError => {
        if (fieldError.error instanceof MinLengthFieldError) {
          switch (fieldError.field) {
            case UserField.NAME: {
              person.setName(faker.random.alphaNumeric(UserManagement.MIN_NAME_LENGTH + 1))
              break
            }
            case UserField.LAST_NAME: {
              person.setLastName(faker.random.alphaNumeric(UserManagement.MIN_LAST_NAME_LENGTH + 1))
              break
            }
          }
        } else if (fieldError.error instanceof RequiredFieldError) {
          switch (fieldError.field) {
            case UserField.NAME: {
              person.setName(faker.random.alphaNumeric(UserManagement.MIN_NAME_LENGTH))
              break
            }
            case UserField.LAST_NAME: {
              person.setLastName(faker.random.alphaNumeric(UserManagement.MIN_LAST_NAME_LENGTH))
              break
            }
          }
        } else if (fieldError.error instanceof InvalidFieldError) {
          person.setPhoneNumber('(415) 555-2671')
        } else {
          person.setEmail('dominicsc2hs@gmail.com')
        }
      })
    })
  }

  logErrors() {
    for (const [user, fieldErrors] of this.errorMap) {
      let message = 'has the following validation failures: '
      for (const fieldError of fieldErrors) {
        message += fieldError.error.message + '. '
      }
      console.log(`User ${user.getId()} ${message}`)
    }
  }

  /**
   *
   * @param validations A {@link FieldValidation[]}
   * @param person A {@link PersonDto}
   * @param fieldValue An input field value to validate.
   * @param field The name of the field to validate
   */
  private executeValidation(
    validations: FieldValidation[],
    person: PersonDto,
    fieldValue: string,
    field: UserField
  ) {
    validations.forEach(validation => {
      const error = validation.validate(fieldValue, field)
      if (error) {
        this.errorMap.set(person, [...this.errorMap.get(person), { field, error }])
      }
    })
  }
}

const userManagement = new UserManagement()
const validUser = new PersonDto(1, 'Je', 'Aguilar', '(415) 555-2671', 'dominicsc2hs@gmail.com')
const invalidUser1 = new PersonDto(2, 'Rodrigo', '', '(415) 555-267', 'aguilar@gmail.com')
const invalidUser2 = new PersonDto(3, 'Jamal', 'Aguilar', '(415) 555-267', 'aguilargmail.com')
userManagement.addPerson(validUser)
userManagement.addPerson(invalidUser1)
userManagement.addPerson(invalidUser2)
userManagement.validatePeople()
userManagement.logErrors()
userManagement.fixPeople()
userManagement.validatePeople()
userManagement.logErrors()
