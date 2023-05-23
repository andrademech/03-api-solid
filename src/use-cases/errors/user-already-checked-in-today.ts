export class UserAlreadyCheckedInTodayError extends Error {
  constructor() {
    super('User already checked in today.')
  }
}
