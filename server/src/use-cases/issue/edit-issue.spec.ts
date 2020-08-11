import { MockIssueClass, MockIssueData } from "../../domain/issue";
import { mockDatabase } from "../../data-access/database.mock";
import EditIssueUseCase from "./edit-issue";
describe(">> edit-issue", () => {
  const editIssue = new EditIssueUseCase({database: mockDatabase, IssueConstructor: MockIssueClass});

  it("should takes in issue info and return the new issue data object back", async () => {
    const issueInfo = MockIssueData[0];
    mockDatabase.insertIssue(issueInfo);
    issueInfo.title = "changed"
    const updatedIssue = await editIssue.execute(issueInfo)
    expect(updatedIssue.title).toEqual("changed");
  })

  it("should throw an error if trying to edit an non-existed record", async () => {
    const issueInfo = MockIssueData[1];
    await expect(editIssue.execute(issueInfo)).rejects.toThrowError(/issue does not exist/);
  })

  it("should throw an error if issue id is missing", async() => {
    const issueInfo = MockIssueData[0];
    mockDatabase.insertIssue(issueInfo);
    issueInfo.title = "changed";
    issueInfo.id = undefined;
    await expect(editIssue.execute(issueInfo)).rejects.toThrowError(/Id is required/);
  })
});