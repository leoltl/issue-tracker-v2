import { IProject } from "../../domain/project";
import { IUseCase } from "../index";

export default class RemoveMembershipProjectUseCase implements IUseCase {
  private database;
  private showProjectUC;
  private showUserUC

  constructor({ database, showProjectUC, showUserUC }) {
    this.database = database;
    this.showProjectUC = showProjectUC;
    this.showUserUC = showUserUC;
  }

  async execute(projectId: string, userId: string ): Promise<IProject> {
    const [project] = await this.showProjectUC.execute({ projectId });
    const user = await this.showUserUC.execute({ userIdentifier: userId });
    project.removeMember(user);
    return this.database.updateProjectMembership(project);
  } 
}