import { IProject } from "../../domain/project";
import { IUseCase } from "../index";
import id, { IId } from "../../domain/id";
import roles from "../../middlewares/authorization/roles";

export default class ShowProjectUseCase implements IUseCase {
  private database
  private ProjectConstructor;
  private ShowUserUC;
  private ShowIssueUC;

  constructor({ 
    database, 
    ProjectConstructor, 
    showUserUC, 
    showIssueUC } :
    { database: any, 
      ProjectConstructor: IProject, 
      showUserUC: IUseCase, 
      showIssueUC: IUseCase 
    }) {
    this.database = database;
    this.ProjectConstructor = ProjectConstructor;
    this.ShowUserUC = showUserUC;
    this.ShowIssueUC = showIssueUC;
  }

  async execute({ projectId, userId, role }: {projectId?: string, userId?: string, role?: string}): Promise<IProject[]> {
    try {
      let projects;
      if (!projectId) {
        const isAdmin = role === roles.admin
        projects = await this.database.findAllProject({ userId }, isAdmin);
      } else {
        projects = [ await this.database.findProjectById(projectId) ]
      }
      if (!projects) {
        throw new Error("Id provided is not a valid project.")
      }
      return await Promise.all(projects.map(async project => {
        var _project = Object.assign({}, project._doc);
        _project.members = await Promise.all(project.members.map(async memberId => 
          await this.ShowUserUC.execute({ userIdentifier: memberId, externalUse: true })
        ));
        _project.issues = await Promise.all(project.issues.map(issue => this.ShowIssueUC.execute(issue)));
        return new this.ProjectConstructor(_project);
      }));
    } catch (e) {
      throw e;
    }
  } 
  
}