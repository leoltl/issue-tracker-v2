import { buildProject } from "./project";
import { mockId } from "../id";
import { MockIssueData, MockIssues } from "../issue";
import { MockUserData, MockUsers } from "../user";

export const MockProjectClass = buildProject({ Id: mockId });

export const MockProjectData = [
  {
    id: "_123lksjdf",
    name: "project uno",
    issues: MockIssueData.slice(0,1).map(issue => issue.id),
    members: MockUserData.slice(0,2).map(user => user.id),
  },
  {
    id: "_ksjdf12l1",
    name: "project dos",
    issues: MockIssueData.slice(1).map(issue => issue.id),
    members: MockUserData.slice(2).map(user => user.id),
  }
]

export const MockProjects = [
  {
    id: "_123lksjdf",
    name: "project uno",
    issues: MockIssues.slice(0,1),
    members: MockUsers.slice(0,2),
  },
  {
    id: "_ksjdf12l1",
    name: "project dos",
    issues: MockIssues.slice(1),
    members: MockUsers.slice(2),
  }
]