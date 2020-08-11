import { MockProjectData } from "../../domain/project";
import ShowProjectUseCase from "./show-project";
import { MockProjectClass } from "../../domain/project";

describe(">> show-project", () => {
  const mockDatabase = {
    findProjectById: jest.fn(() => MockProjectData[0])
  }
  const mockShowUserUC = {
    execute: jest.fn(() => 1)
  }
  const mockShowIssueUC = {
    execute: jest.fn(() => 2)
  }
  const ShowProject = new ShowProjectUseCase({
    database: mockDatabase,
    ProjectConstructor: MockProjectClass,
    ShowUserUC: mockShowUserUC,
    ShowIssueUC: mockShowIssueUC,
  })

  it ("should call findUserById in database and call user and issues use case according to data", async () => {
    await ShowProject.execute({ projectId: "123"})
    expect(mockDatabase.findProjectById).toBeCalledWith("123");
    expect(mockShowIssueUC.execute).toBeCalledTimes(MockProjectData[0].issues.length);
    expect(mockShowUserUC.execute).toBeCalledTimes(MockProjectData[0].members.length);
  })
})