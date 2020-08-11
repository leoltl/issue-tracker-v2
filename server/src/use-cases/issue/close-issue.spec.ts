import { MockIssueClass, MockIssueData } from "../../domain/issue";
import { mockDatabase } from "../../data-access/database.mock";
import CloseIssueUseCase from "./close-issue";
describe(">> close-issue", () => {
  const closeIssue = new CloseIssueUseCase({database: mockDatabase, IssueConstructor: MockIssueClass});

  it("should takes in issue info and return the new issue data object back", async () => {
    const issueInfo = MockIssueData[0];
    mockDatabase.insertIssue(issueInfo);
    const closedIssue = await closeIssue.execute({id: issueInfo.id});
    expect(closedIssue.getStatus()).toEqual("closed");
  })

  it("should throw an error if trying to close an non-existed record", async () => {
    const issueInfo = MockIssueData[1];
    await expect(closeIssue.execute({id: issueInfo.id})).rejects.toThrowError(/issue does not exist/);
  })

  it("should throw an error if issue id is missing", async() => {
    const issueInfo = MockIssueData[0];
    mockDatabase.insertIssue(issueInfo);
    await expect(closeIssue.execute({id: undefined})).rejects.toThrowError(/Id is required/);
  })
});