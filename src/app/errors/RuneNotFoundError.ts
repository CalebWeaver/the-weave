export default class RuneNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RuneNotFoundError';
  }
}
