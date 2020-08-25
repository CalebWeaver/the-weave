export default class RuneOrderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RuneOrderError';
  }
}
