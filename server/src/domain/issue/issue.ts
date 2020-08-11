import { IIssue, priority } from "./issue.types";
import { IUser } from "../user";
import { IId } from "../id";

export function buildIssueClass ({ Id } : { Id: IId }) : any {
  return class Issue implements IIssue {
    private id?: string
    private title: string
    private description: string
    private author: IUser
    private status?: string
    private priority?: priority
    private createdAt?: Date
    private assignedTo?: IUser
  
    constructor({ 
        title, 
        description, 
        author, 
        status="open", 
        priority=null, 
        assignedTo=null,
        id=Id.genId(),
        createdAt,
        _id
      }) {
      if (!title) {
        throw new Error(`Missing required field: title`);
      }
      if (!description) {
        throw new Error("Missing required field: description")
      }
      if (!author) {
        throw new Error("Missing required field: author")
      }
      this.id = _id || id;
      this.title = title;
      this.description = description;
      this.author = author;
      this.status = status;
      if (priority) {
        this.priority = priority;
      }
      if (assignedTo) {
        this.assignedTo = assignedTo;
      }
      if (createdAt) {
        this.createdAt = createdAt;
      }
    }
  
    getId() {
      return this.id;
    }
  
    getTitle() {
      return this.title;
    }
  
    getDescription() {
      return this.description;
    }
  
    getAuthor(): IUser {
      return this.author;
    }  
  
    getStatus(): string {
      return this.status;
    }
  
    closeIssue(): void {
      this.status = "closed";
    }
  
    getPriority(): priority {
      return this.priority
    }
  
    getAssignedTo(): IUser{
      return this.assignedTo;
    }
  
  }
}