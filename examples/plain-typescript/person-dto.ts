export class PersonDto {
  constructor(
    private readonly name: string,
    private readonly lastName: string,
    private readonly phoneNumber: string,
    private readonly email: string
  ) {}

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
}
