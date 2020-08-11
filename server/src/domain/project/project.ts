import { IProject } from "./project.types";
import { IIssue } from "../issue";
import { IUser } from "../user";
import { IId } from "../id";

export function buildProject({ Id }: { Id: IId }): any {
  return class Project implements IProject {
    private id: string
    private name: string
    private issues: Array<IIssue>
    private members: Array<IUser>
    constructor({
      name,
      issues=[],
      members=[],
      id=Id.genId(),
      _id
    }) {
      if (!name) {
        throw new Error("Missing required field(s)");
      }
      this.name = name;
      this.issues = issues;
      this.members = members;
      this.id = _id || id;
    }
    getId(): string {
      return this.id;
    }
    getName(): string {
      return this.name;
    }
    getIssues(): IIssue[] {
      return this.issues;
    }
    getMembers(): IUser[] {
      return this.members;
    }
    addMember(user: IUser): boolean {
      if (this.members.find(member => { 
        return member.getUsername() == user.getUsername()
      })) {
        return false;
      }
      this.members.push(user);
      return true;
    }
    removeMember(user: IUser): boolean {
      if (this.members.find(member => member.getUsername() === user.getUsername())) {
        this.members = this.members.filter(member => member.getUsername() !== user.getUsername())
        return true;
      }
      return false;
    }
    addIssue(newIssue: IIssue): boolean {
      if (this.issues.find(issue => issue.getId() == newIssue.getId())) {
        return false;
      }
      this.issues.push(newIssue);
      return true;
    }
  }
} 