import { IIssue, IIssueData } from "../../domain/issue";
import { IUseCase } from "../index";

export default class ListIssueUseCase implements IUseCase {
  private database;
  private IssueConstructor;
  private ShowUserUC;

  constructor({ database, IssueConstructor, ShowUserUC }: {database: any, IssueConstructor: IIssue, ShowUserUC: IUseCase}) {
    this.database = database;
    this.IssueConstructor = IssueConstructor;
    this.ShowUserUC = ShowUserUC;
  }

  async execute(conditions): Promise<IIssueData> {
    try {
      let exist = await this.database.findIssue(conditions);
      if (!exist) {
        throw new Error("Requested issue does not exist.")
      }
      return exist
    } catch (e) {
      throw e;
    }
  }
}