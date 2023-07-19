export class YouAreNotAllowedToChangeThisResourceError extends Error {
  constructor() {
    super('You are not allowed to change this resource.');
    this.name = 'YouAreNotAllowedToChangeThisResourceError';
  }
}
