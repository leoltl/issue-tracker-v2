import { IUser } from "../user";

export interface IIssue {
  getId(): string
  getTitle(): string
  getDescription(): string
  getAuthor(): IUser
  getAssignedTo(): IUser
  getStatus(): string
  getPriority(): priority
  closeIssue(): void
}

export interface IIssueData {
  id?: string
  title: string
  description: string
  author: string | IUser
  status?: string
  priority?: priority
  assignedTo?: string | IUser
}

export enum priority {
  low,
  medium,
  high,
  severe
}