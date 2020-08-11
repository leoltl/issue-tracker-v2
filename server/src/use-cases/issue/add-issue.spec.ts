import { MockIssueClass, MockIssueData } from "../../domain/issue";
import { MockProjectClass } from "../../domain/project";
import { mockDatabase } from "../../data-access/database.mock";
import AddIssueUseCase from "./add-issue";
describe(">> add-issue", () => {
  const addIssue = new AddIssueUseCase({database: mockDatabase, IssueConstructor: MockIssueClass});

  it("should takes in issue info and return the new issue data object back", async () => {
    const issueInfo = MockIssueData[0];
    expect(await addIssue.execute(issueInfo)).toMatchObject(issueInfo);
  })

  it("should throw an error if passed nothing in to addIssue", async () => {
    await expect(addIssue.execute({})).rejects.toThrowError(/Missing required field/);
  })
  
});