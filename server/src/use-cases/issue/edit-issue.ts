import { IIssue, IIssueData } from "../../domain/issue";
import { IUseCase } from "../index";

export default class EditIssueUseCase implements IUseCase {
  private database;
  private IssueConstructor;

  constructor({database, IssueConstructor}: {database: any, IssueConstructor: IIssue}) {
    this.database = database;
    this.IssueConstructor = IssueConstructor;
  }

  async execute(issueInfo): Promise<IIssueData> {
    try {
      // if (!id) {
      //   throw new Error("Id is required to edit an issue.")
      // }
      // const exist = this.database.findIssueById(id);
      // if (!exist) {
      //   throw new Error("Requested issue does not exist. Failed to edit the issue.")
      // }
      const projectId = issueInfo.projectId;
      const issue = new this.IssueConstructor(issueInfo);
      return await this.database.updateIssue(issue, projectId);
    } catch (e) {
      throw e;
    }
  }
}