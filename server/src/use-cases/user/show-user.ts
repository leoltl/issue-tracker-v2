import { IUser, IUserData } from "../../domain/user";
import { IUseCase } from "../index";
import { IId } from "../../domain/id";
import { ICache } from "../../data-access/cache";


export default class ShowUserUseCase implements IUseCase {
  private database
  private UserConstructor;
  private Id;
  private cache;

  constructor({ database, UserConstructor, Id, cache }: { database, UserConstructor: IUser, Id: IId, cache: ICache}) {
    this.database = database;
    this.UserConstructor = UserConstructor;
    this.Id = Id;
    this.cache = cache;
  }

  async execute({ userIdentifier, externalUse=false }: {userIdentifier: string, externalUse?: boolean}): Promise<IUserData> {
    try {
      if (!userIdentifier) {
        throw new Error("Must provide a username or user id.")
      }
      let userInfo, user;
      if (this.Id.validId(userIdentifier) && this.cache.get(userIdentifier) != null) {
        user = this.cache.get(userIdentifier);
      } else {
        if (this.Id.validId(userIdentifier)) {
          userInfo = await this.database.findUserById(userIdentifier)
        } else {
          userInfo = await this.database.findUserByUsername(userIdentifier);
        }
        if (!userInfo) {
          throw new Error("Username or user id provided is not a registered user.")
        }
        user = new this.UserConstructor(userInfo)
        this.cache.set(user.id, user)
      }
      return externalUse ? user.toExternalUse(): user;
    } catch (e) {
      throw e;
    }
  } 
  
}