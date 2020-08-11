import ShowUserUseCase from "./show-user";
import ListUserUseCase from "./list-user";
import LoginUserUseCase from "./login";
import { MockUserClass, User } from "../../domain/user";
import { mockDatabase } from "../../data-access/database.mock";
import { mongoId, mockId } from "../../domain/id";
import { MemoryStore } from "../../data-access/cache";

import mongoDB from "../../data-access";

export const MockLoginUseCase = new LoginUserUseCase({ database: mockDatabase, UserConstructor: MockUserClass} ); 

export const MockShowUserUseCase = new ShowUserUseCase({ database: mongoDB, UserConstructor: MockUserClass, Id: mockId, cache: new MemoryStore() });

export const ShowUser = new ShowUserUseCase({ database: mongoDB, UserConstructor: User, Id: mongoId, cache: new MemoryStore() });

export const ListUser = new ListUserUseCase({ database: mongoDB, UserConstructor: User, Id: mongoId });

export const SignInUser = new LoginUserUseCase({ database: mongoDB, UserConstructor: User }); 