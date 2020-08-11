import { MockUserClass, MockUserData, MockUsers } from "../../domain/user";
import { mockDatabase } from "../../data-access/database.mock";
import ShowUserUseCase from "./show-user";
import { mockId } from "../../domain/id";
describe(">> login-user",() => {
  MockUserData.forEach(user => mockDatabase.insertUser(user));
  const ShowUser = new ShowUserUseCase({ database: mockDatabase, UserConstructor: MockUserClass, Id: mockId });
  it("should takes in a user Id and return the user (without password)", async () => {
    const userWithoutPassword = MockUserData[1];
    delete userWithoutPassword.hashedPassword;
    expect(await ShowUser.execute({userIdentifier: MockUsers[1].getId()})).toEqual(userWithoutPassword);
  });

  it("should takes in a username and return the user (without password)", async () => {
    const userWithoutPassword = MockUserData[2];
    delete userWithoutPassword.hashedPassword;
    expect(await ShowUser.execute({userIdentifier: MockUsers[2].getUsername()})).toEqual(userWithoutPassword);
  });

  it("should throw error if a non existed username is passed in", async () => {
    await expect(ShowUser.execute({userIdentifier: "notAUser"})).rejects.toThrowError(/not a registered user./);
  });

  it("should throw error if a non existed id is passed in", async () => {
    await expect(ShowUser.execute({userIdentifier: "_invalidID"})).rejects.toThrowError(/not a registered user./);
  });

  it("should throw error if a non existed id is passed in", async () => {
    await expect(ShowUser.execute({userIdentifier: undefined})).rejects.toThrowError(/Must provide a username or user id/);
  });

  it("should remove user's hash password when returning", async () => {
    const user = await ShowUser.execute({userIdentifier: MockUsers[2].getUsername()})
    expect(user.hashedPassword).toBeUndefined();
  })
});