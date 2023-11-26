export class AuthenticationInvalidError extends Error {
  constructor() {
    super('Authentication invalid.');
    this.name = 'AuthenticationInvalidError';
  }
}
