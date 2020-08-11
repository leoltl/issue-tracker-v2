import { buildMakeUser } from "./user";
import { mockHash } from "./user.mock";
import { role } from "./user.types"; 
import { mockId } from "../id";

describe(">> user ", () => {
  const User = buildMakeUser({ hashFunction: mockHash, Id: mockId });

  describe(">> constructor", () => {
    it("should instantiate User", () => {
      const userInfo = {
        name: "Admin",
        username: "u_Admin",
        hashedPassword: "***1234567***",
        email: "admin@gmail.com",
        role: "admin"
      }
      const entity = new User(userInfo);
      expect(entity).toBeTruthy();
      expect(entity.getName()).toEqual(userInfo.name);
      expect(entity.getHashedPassword()).toEqual(userInfo.hashedPassword);
      expect(entity.getUsername()).toEqual(userInfo.username);
      expect(entity.getEmail()).toEqual(userInfo.email);
      expect(entity.getRole()).toEqual(userInfo.role);
    });

    it ("should not instantiate User and throw Error when required field is missing", () => {
      const userWithEmptyName = {
        name: "",
        username: "u_Admin",
        hashedPassword: "***1234567***",
        email: "admin@gmail.com",
      }
      expect(() => new User(userWithEmptyName)).toThrow();

      const userWithUndefinedName = {
        name: undefined,
        username: "u_Admin",
        hashedPassword: "***1234567***",
        email: "admin@gmail.com",
      }
      expect(() => new User(userWithUndefinedName)).toThrow();
    })

    it ("should default to tester if role is not provided for a user", () => {
      const userInfo = {
        name: "MaybeAdmin",
        username: "u_MaybeAdmin",
        hashedPassword: "***1234567***",
        email: "admin@gmail.com",
      }
      const entity = new User(userInfo);
      expect(entity.getRole()).toEqual(role.tester)
    })

    it ("should covert password to hashed password if plain password is supplied to constructor", () => {
      const userInfo = {
        name: "MaybeAdmin",
        username: "u_MaybeAdmin",
        plainPassword: "1234567",
        email: "admin@gmail.com",
      }
      const entity = new User(userInfo);
      expect(entity.getHashedPassword()).toEqual(mockHash.hash(userInfo.plainPassword));
    })

    it ("should return hashed password if hashed password is supplied to constructor", () => {
      const userInfo = {
        name: "MaybeAdmin",
        username: "u_MaybeAdmin",
        hashedPassword: "***1234567***",
        email: "admin@gmail.com",
      }
      const entity = new User(userInfo);
      expect(entity.getHashedPassword()).toEqual(userInfo.hashedPassword);
    })
  });

  describe(">> setPassword", () => {
    it ("should set password hash to new password and return true if the old password is correct", () => {
      const userInfo = {
        name: "MaybeAdmin",
        username: "u_MaybeAdmin",
        hashedPassword: "***1234567***",
        email: "admin@gmail.com",
      }
      const entity = new User(userInfo);
      const newPassword = "newpassword"
      expect(entity.setPassword("1234567", newPassword)).toBeTruthy();
      expect(entity.getHashedPassword()).toEqual(mockHash.hash(newPassword));
    })

    it ("should not set password hash to new password and return false if the old password is wrong", () => {
      const userInfo = {
        name: "MaybeAdmin",
        username: "u_MaybeAdmin",
        hashedPassword: "***1234567***",
        email: "admin@gmail.com",
      }
      const entity = new User(userInfo);
      const newPassword = "newpassword"
      expect(entity.setPassword("wrong", newPassword)).toBeFalsy();
      expect(entity.getHashedPassword()).toEqual(userInfo.hashedPassword);
    })
  })

  describe(">> isCorrectPassword", () => {
    it("should return true if provided password matched the stored password hash", () => {
      const userInfo = {
        name: "MaybeAdmin",
        username: "u_MaybeAdmin",
        hashedPassword: "***1234567***",
        email: "admin@gmail.com",
      }
      const entity = new User(userInfo);
      expect(entity.isCorrectPassword("1234567")).toBeTruthy();
    })

    it("should return false if provided password matched the stored password hash", () => {
      const userInfo = {
        name: "MaybeAdmin",
        username: "u_MaybeAdmin",
        hashedPassword: "***1234567***",
        email: "admin@gmail.com",
      }
      const entity = new User(userInfo);
      expect(entity.isCorrectPassword("wrong")).toBeFalsy();
    })
  })
});