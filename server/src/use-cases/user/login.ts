import { IUser } from "../../domain/user";
import { IUseCase } from "../index";

export default class LoginUserUseCase implements IUseCase {
  private database
  private UserConstructor;

  constructor({ database, UserConstructor }: { database, UserConstructor: IUser }) {
    this.database = database;
    this.UserConstructor = UserConstructor;
  }

  async execute(username: string, password: string): Promise<IUser | undefined> {
    try {
      const userInfo = await this.database.findUserByUsername(username);
      if (!userInfo) {
        throw new Error("Username provided is not a registered user.")
      }
      const user = new this.UserConstructor(userInfo);
      const validCredentials = user.isCorrectPassword(password);
      if (validCredentials) {
        return user
      }
      return undefined;
    } catch (e) {
      throw e;
    }
  } 
  
}