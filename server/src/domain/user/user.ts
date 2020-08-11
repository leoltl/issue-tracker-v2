import { IUser, role, IHashFunction } from "./user.types";
import { IId } from "../id";

export function buildMakeUser({ hashFunction, Id }: { hashFunction: IHashFunction, Id: IId }): any { //TOFIX: return type for class.
  let tester = role.tester;
  return class User implements IUser {
    private name: string
    private id: string
    private username: string
    private hashedPassword: string
    private email: string
    private role: role

    constructor({  
      id = Id.genId(), 
      name, 
      username, 
      plainPassword, 
      hashedPassword,
      email, 
      role=tester,
      _id
    }) {
      if (!name) {
        throw new Error("Missing required field(s): name"); 
      }
      if (!username) {
        throw new Error("Missing required field(s): username"); 
      }
      if (!(plainPassword || hashedPassword)) {
        throw new Error("Missing required field(s): password"); 
      }
      if (!email) {
        throw new Error("Missing required field(s): email"); 
      }
      this.id = _id || id;
      this.name = name;
      this.username = username;
      this.hashedPassword = plainPassword ? hashFunction.hash(plainPassword) : hashedPassword;
      this.email = email;
      this.role = role;
    }
    getId(): string {
      return this.id;
    }
    getName(): string {
      return this.name;
    }
    getUsername(): string {
      return this.username;
    }
    getHashedPassword(): string {
      return this.hashedPassword
    }
    getEmail(): string {
      return this.email
    }
    getRole(): role {
      return this.role
    }
    isCorrectPassword(plainPassword: string): boolean {
      console.log(hashFunction.hash(plainPassword));
      return hashFunction.compare(plainPassword, this.hashedPassword);
    }
    setPassword(oldPlainPassword: string, newPlainPassword: string): boolean {
      if (!this.isCorrectPassword(oldPlainPassword)) return false;
      this.hashedPassword = hashFunction.hash(newPlainPassword);
      return true;
    }
    toExternalUse() {
      delete this.hashedPassword
      return this
    }
  }
}