export class CreditCardAlreadyExistsError extends Error {
  constructor() {
    super('Credit card already exists.');
  }
}
