import bcrypt from "bcrypt";
import { IHashFunction } from './user.types';
import { buildMakeUser } from "./user";
import mongoId from "../id";
export * from "./user.types";
export * from "./user.mock";
const saltRounds = process.env.bcryptRounds || 3;

const bcryptHash: IHashFunction = {
  hash(password) {
    return bcrypt.hashSync(password, saltRounds)
  },
  compare(password, hash) {
    return bcrypt.compareSync(password, hash)
  }
}

export const User = buildMakeUser({ hashFunction: bcryptHash, Id: mongoId });