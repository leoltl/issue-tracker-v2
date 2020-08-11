import { MockIssueClass, MockIssueData, MockIssues } from "../../domain/issue";
import { mockDatabase } from "../../data-access/database.mock";
import ShowIssueUseCase from "./show-issue";
import { MockShowUserUseCase } from "../user";
describe(">> show-issue", () => {
  const showIssue = new ShowIssueUseCase({ database: mockDatabase, IssueConstructor: MockIssueClass, ShowUserUC: MockShowUserUseCase });
  
  MockIssueData.forEach(issue => mockDatabase.insertIssue(issue));
  
  it("should receives an issue Id and return a issue from database", async () => {
    const id = MockIssueData[0].id;
    const response = await showIssue.execute(id);
    expect(response).toEqual(MockIssues[0]);
    expect(response instanceof MockIssueClass).toBeTruthy();
  });

  it ("should throw an error if provided id is not found from database", async () => {
    const id = '_nonexistence';
    await expect(showIssue.execute(id)).rejects.toThrowError();
  });

  it ("should throw an error if no id is provided", async () => {
    const id = undefined;
    await expect(showIssue.execute(id)).rejects.toThrowError();
  });
});