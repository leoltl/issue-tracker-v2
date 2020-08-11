import { IIssue, IIssueData } from "../../domain/issue";
import { IUseCase } from "../index";
import { IProject } from "../../domain/project";

export default class AddIssueUseCase implements IUseCase {
  private database;
  private IssueConstructor;

  constructor({
    database, 
    IssueConstructor,
  }: {database: any, IssueConstructor: IIssue}) {
    this.database = database;
    this.IssueConstructor = IssueConstructor;
  }

  async execute(issueInfo: IIssueData, projectId: string): Promise<IIssueData> {
    try {
      return await this.database.insertIssue(new this.IssueConstructor(issueInfo), projectId);
    } catch (e) {
      throw e;
    }
  }
}