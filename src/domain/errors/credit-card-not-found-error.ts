export class CreditCardNotFoundError extends Error {
  constructor() {
    super('Credit card not found.');
    this.name = 'CreditCardNotFoundError';
  }
}
