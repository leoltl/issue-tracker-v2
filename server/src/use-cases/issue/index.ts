import ShowIssueUseCase from "./show-issue";
import ListIssueUseCase from "./list-issue";
import AddIssueUseCase from "./add-issue";
import EditIssueUseCase from "./edit-issue";
import CloseIssueUseCase from "./close-issue";

import { mockDatabase } from "../../data-access/database.mock";
import { MockIssueClass, Issue } from "../../domain/issue";
import { MockShowUserUseCase, ShowUser } from "../user";

import mongoDB from "../../data-access";

export const MockShowIssueUseCase = new ShowIssueUseCase({
  database: mongoDB,
  IssueConstructor: MockIssueClass, 
  ShowUserUC: MockShowUserUseCase,
})

export const ShowIssue = new ShowIssueUseCase({ 
  database: mongoDB, 
  IssueConstructor: Issue, 
  ShowUserUC: ShowUser 
})

export const ListIssue = new ListIssueUseCase({ 
  database: mongoDB, 
  IssueConstructor: Issue, 
  ShowUserUC: ShowUser 
})

export const AddIssue = new AddIssueUseCase({
  database: mongoDB,
  IssueConstructor: Issue,
})

export const EditIssue =  new EditIssueUseCase({
  database: mongoDB,
  IssueConstructor: Issue,
})

export const CloseIssue = new CloseIssueUseCase({
  database: mongoDB,
  IssueConstructor: Issue,
})