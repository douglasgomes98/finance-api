export class BankNotFoundError extends Error {
  constructor() {
    super('Bank not found.');
    this.name = 'BankNotFoundError';
  }
}
