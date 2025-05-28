import { ValidationBuilder as Builder } from 'coffeeless-validator/dist'
import { FieldValidation } from '../../dist/protocols/field-validation'
import { PersonDto } from './person-dto'

class UserManagement {
  private errorMap = new Map<string, Error[]>()
  constructor(private readonly people: PersonDto[] = []) {}

  addPerson(personDto: PersonDto) {
    this.people.push(personDto)
  }

  validatePeople() {
    this.people.forEach(person => {
      const nameValidations = Builder.init()
        .required('Name is required')
        .min(3, 'Name should have at least 3 characters')
        .build()
      const lastNameValidations = Builder.init().required('Last name is required').min(5).build()
      const phoneValidations = Builder.init()
        .valid(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, 'Phone number is not correct')
        .build()
      const emailValidations = Builder.init().email('Email is not correct').build()

      this.errorMap.set(person.getName(), [])

      this.executeValidation(nameValidations, person, person.getName(), 'Name')
      this.executeValidation(lastNameValidations, person, person.getLastName(), 'Last name')
      this.executeValidation(phoneValidations, person, person.getPhoneNumber(), 'Phone number')
      this.executeValidation(emailValidations, person, person.getEmail(), 'Email')
    })
  }

  logErrors() {
    for (const [key, value] of this.errorMap) {
      console.log(`User ${key} has the following validation failures: ${value.toString()}`)
    }
  }

  private executeValidation(
    validations: FieldValidation[],
    person: PersonDto,
    inputField: string,
    fieldName: string
  ) {
    validations.forEach(validation => {
      const error = validation.validate(inputField, fieldName)
      if (error) {
        this.errorMap.set(person.getName(), [...this.errorMap.get(person.getName()), error])
      }
    })
  }
}

const userManagement = new UserManagement()
const validUser = new PersonDto('Je', 'Aguilar', '(415) 555-2671', 'dominicsc2hs@gmail.com')
const invalidUser1 = new PersonDto('Rodrigo', 'Agui', '(415) 555-267', 'aguilar@gmail.com')
const invalidUser2 = new PersonDto('Jamal', 'Aguilar', '(415) 555-267', 'aguilargmail.com')
userManagement.addPerson(validUser)
userManagement.addPerson(invalidUser1)
userManagement.addPerson(invalidUser2)
userManagement.validatePeople()
userManagement.logErrors()
