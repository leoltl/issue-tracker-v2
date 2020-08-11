import { IProject } from "../../domain/project";
import { IUseCase } from "../index";

export default class AddMembershipProjectUseCase implements IUseCase {
  private database;
  private showProjectUC;
  private showUserUC

  constructor({ database, showProjectUC, showUserUC }) {
    this.database = database;
    this.showProjectUC = showProjectUC;
    this.showUserUC = showUserUC;
  }

  async execute(projectId: string, userIds: string[] ): Promise<IProject> {
    let [project] = await this.showProjectUC.execute({ projectId });
    const users = await Promise.all(userIds.map(userId => 
      this.showUserUC.execute({ userIdentifier: userId })
    ));
    users.forEach(user => project.addMember(user));
    project = await this.database.updateProjectMembership(project);
    project.id = project._id
    delete project._id
    return project
  } 
}