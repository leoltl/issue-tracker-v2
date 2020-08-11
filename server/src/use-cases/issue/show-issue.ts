import { IIssue, IIssueData } from "../../domain/issue";
import { IUseCase } from "../index";

export default class ShowIssueUseCase implements IUseCase {
  private database;
  private IssueConstructor;
  private ShowUserUC;

  constructor({ database, IssueConstructor, ShowUserUC }: {database: any, IssueConstructor: IIssue, ShowUserUC: IUseCase}) {
    this.database = database;
    this.IssueConstructor = IssueConstructor;
    this.ShowUserUC = ShowUserUC;
  }

  async execute(issudId): Promise<IIssueData> {
    try {
      if (!issudId) {
        throw new Error("Id is required to show an issue.")
      }
      const exist = Object.assign({}, (await this.database.findIssueById(issudId))._doc);
      if (!exist) {
        throw new Error("Requested issue does not exist.")
      }
      exist.author = await this.ShowUserUC.execute({ userIdentifier: exist.author, externalUse: true });
      if (exist.assignedTo) {
        exist.assignedTo = await this.ShowUserUC.execute({ userIdentifier: exist.assignedTo, externalUse: true });
      }
      return new this.IssueConstructor(exist);
    } catch (e) {
      throw e;
    }
  }
}