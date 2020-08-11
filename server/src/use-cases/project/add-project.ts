import { IProject, IProjectData } from "../../domain/project";
import { IUseCase } from "../index";
export default class AddProjectUseCase implements IUseCase {
  private database
  private ProjectConstructor;
  private ShowUserUC;
  private ShowProjectUC;

  constructor({ 
    database, 
    ProjectConstructor,
    showUserUC,
    showProjectUC,
   } :
    { database: any, 
      ProjectConstructor: IProject, 
      showUserUC: IUseCase, 
      showProjectUC: IUseCase,
    }) {
    this.database = database;
    this.ProjectConstructor = ProjectConstructor;
    this.ShowUserUC = showUserUC;
    this.ShowProjectUC = showProjectUC;
  }

  async execute({ userSuppliedInfo, userId }: {userSuppliedInfo: IProjectData, userId: String}): Promise<IProject> {
    try {
      const projectInfo = { ...userSuppliedInfo, issues: [], members: [userId]};
      const newProject = new this.ProjectConstructor(projectInfo);
      const { _id } = await this.database.insertProject(newProject);
      return this.ShowProjectUC.execute({ projectId: _id });
    } catch (e) {
      throw e;
    }
  } 
}