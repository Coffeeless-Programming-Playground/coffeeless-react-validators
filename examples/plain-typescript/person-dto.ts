import { FieldValidation } from '../../dist'

export class PersonDto {
  public nameValidations: FieldValidation[]
  public lastNameValidations: FieldValidation[]
  public phoneValidations: FieldValidation[]
  public emailValidations: FieldValidation[]

  constructor(
    private id: number,
    private name: string,
    private lastName: string,
    private phoneNumber: string,
    private email: string
  ) {}

  getId() {
    return this.id
  }

  getName() {
    return this.name
  }

  getLastName() {
    return this.lastName
  }

  getPhoneNumber() {
    return this.phoneNumber
  }

  getEmail() {
    return this.email
  }

  setName(name: string) {
    this.name = name
  }

  setLastName(lastName: string) {
    this.lastName = lastName
  }

  setPhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber
  }

  setEmail(email: string) {
    this.email = email
  }
}
