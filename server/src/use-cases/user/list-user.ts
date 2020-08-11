import { IUser, IUserData } from "../../domain/user";
import { IUseCase } from "../index";
import { IId } from "../../domain/id";

export default class ListUserUseCase implements IUseCase {
  private database
  private UserConstructor;
  private Id;

  constructor({database, UserConstructor, Id}: { database, UserConstructor: IUser, Id: IId }) {
    this.database = database;
    this.UserConstructor = UserConstructor;
    this.Id = Id;
  }

  async execute(conditions={}): Promise<IUserData[]> {
    try {
      const usersInfo = await this.database.findUsers(conditions)
      return usersInfo.map(userInfo => new this.UserConstructor(userInfo).toExternalUse())
    } catch (e) {
      throw e;
    }
  } 
  
}