import { MockUserClass } from "../../domain/user";
import { mockDatabase } from "../../data-access/database.mock";
import LoginUserUseCase from "./login";
describe(">> login-user",() => {
  const Login = new LoginUserUseCase({database: mockDatabase, UserConstructor: MockUserClass });
  it("should takes in a username and correct password and return true", async () => {
    expect(await Login.execute("u_admin", "1234567")).toEqual(true);
  });

  it("should takes in a username and a wrong password and return false", async () => {
    expect(await Login.execute("u_admin", "wrong")).toEqual(false);
  });

  it("should throw an error when username provided is not a registered user", async () => {
    await expect(Login.execute("notAUser", "1234567")).rejects.toThrowError(/not a registered user/);
  })
});