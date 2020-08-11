import AddProjectMemberUseCase from "./add-membership";
import RemoveProjectMemberUseCase from "./remove-membership";
import ShowProjectUseCase from "./show-project";
import AddProjectUseCase from "./add-project";
import { ShowUser } from "../user";
import { ShowIssue } from "../issue";
import { Project } from "../../domain/project";

import mongoDB from "../../data-access";

export const ShowProject = new ShowProjectUseCase({ 
  database: mongoDB, 
  ProjectConstructor: Project, 
  showUserUC: ShowUser, 
  showIssueUC: ShowIssue
});

export const AddProjectMember = new AddProjectMemberUseCase({ 
  database: mongoDB, 
  showProjectUC: ShowProject, 
  showUserUC: ShowUser 
});

export const RemoveProjectMember = new RemoveProjectMemberUseCase({
  database: mongoDB,
  showProjectUC: ShowProject,
  showUserUC: ShowUser,
})

export const AddProject = new AddProjectUseCase({
  database: mongoDB, 
  ProjectConstructor: Project,
  showUserUC: ShowUser,
  showProjectUC: ShowProject,
})