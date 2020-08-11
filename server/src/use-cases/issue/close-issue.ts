import { IIssue, IIssueData } from "../../domain/issue";
import { IUseCase } from "../index";

export default class ShowIssueUseCase implements IUseCase {
  private database;
  private IssueConstructor;

  constructor({database, IssueConstructor}: {database: any, IssueConstructor: IIssue}) {
    this.database = database;
    this.IssueConstructor = IssueConstructor;
  }

  async execute({id}): Promise<IIssue> {
    try {
      if (!id) {
        throw new Error("Id is required to show an issue.")
      }
      const exist = this.database.findIssueById(id);
      if (!exist) {
        throw new Error("Requested issue does not exist.");
      }
      const issue = new this.IssueConstructor(exist);
      issue.closeIssue();
      return await this.database.updateIssue(issue);
    } catch (e) {
      throw e;
    }
  }
}