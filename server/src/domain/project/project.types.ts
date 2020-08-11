import { IIssue, IIssueData } from "../issue/issue.types";
import { IUser, IUserData } from "../user";

export interface IProject {
  getId(): string
  getName(): string
  getIssues(): Array<IIssue>
  getMembers(): Array<IUser>
  addMember(user: IUser): boolean
  addIssue(issue: IIssue): boolean
}

export interface IProjectData {
  id: string
  name: string
  issues: IIssueData
  members: IUserData
}