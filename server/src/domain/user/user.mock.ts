import { buildMakeUser } from "./user";
import { IHashFunction } from "./user.types";
import { mockId } from "../id";

const hashWrapperMock = {
  hash(password) {
    return "***" + password + "***"
  },
  compare(password, hash) {
    return hash.replace(/\*/g, "") === password
  }
}
export const MockUserClass = buildMakeUser({ hashFunction: hashWrapperMock, Id: mockId });

export const MockUserData = [
  {
    id: "_l1smkt2hd",
    name: "Admin",
    username: "u_admin",
    hashedPassword: "***1234567***",
    email: "admin@gmail.com",
    role: "admin"
  }, 
  {
    id: "_2ynhb4z3b",
    name: "MaybeAdmin",
    username: "u_MaybeAdmin",
    hashedPassword: "***1234567***",
    email: "MaybeAdmin@gmail.com",
    role: 'tester',
    },
  {
    id: "_2yn123z3b",
    name: "Project Manager",
    username: "u_PM",
    hashedPassword: "***1234567***",
    email: "MaybeAdmin@gmail.com",
    role: "pm",
    },
  {
    id: "_ddyhb43b",
    name: "developer",
    username: "u_dev",
    hashedPassword: "***1234567***",
    email: "dev@gmail.com",
    role: "dev",
  }]

export const MockUsers = MockUserData.map(userinfo => new MockUserClass(userinfo));


export const mockHash: IHashFunction = {
  hash(password) {
    return "***" + password + "***"
  },
  compare(password, hash) {
    return hash.replace(/\*/g, "") === password
  }
};