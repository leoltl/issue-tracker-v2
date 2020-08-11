export interface IUser {
  getId(): string
  getName(): string
  getUsername(): string
  getHashedPassword(): string
  getEmail(): string
  getRole(): role
  setPassword(oldPlainPassword: string, newPlainPassword: string): boolean
  isCorrectPassword(plainPassword: string): boolean
  toExternalUse(): Object
}

export interface IUserData {
  id: string
  name: string
  username: string
  plainPassword?: string
  hashedPassword: string
  email: string
  role: string | role
}

export enum role {
  admin,
  pm,
  dev,
  tester
}


export interface IHashFunction {
  hash(password: string): string
  compare(password: string, hash: string) : boolean
}