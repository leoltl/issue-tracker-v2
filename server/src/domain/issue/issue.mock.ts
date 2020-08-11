import { IIssue } from "./issue.types";
import { buildIssueClass } from "./issue";
import { MockUsers, MockUserData } from "../user";
import { mockId } from "../id";

export const MockIssueData = [
  {
    id: "1234",
    title: "first issue",
    description: "first issue of the project...",
    author: MockUserData[0].id,
    status: "open",
    priority: "low",
  },
  {
    id: "2234",
    title: "second issue",
    description: "second issue of the project...",
    author: MockUserData[1].id,
    status: "open",
    priority: "low",
    assignedTo: MockUserData[3].id,
  },
  {
    id: "3324",
    title: "third issue",
    description: "second issue of the project...",
    author: MockUserData[2].id,
    status: "open",
    priority: "low",
    assignedTo: MockUserData[3].id,
  }
]

export const MockIssueClass = buildIssueClass({ Id: mockId });

const _issues = [
  {
    id: "1234",
    title: "first issue",
    description: "first issue of the project...",
    author: MockUsers[0],
    status: "open",
    priority: "low",
  },
  {
    id: "2234",
    title: "second issue",
    description: "second issue of the project...",
    author: MockUsers[1],
    status: "open",
    priority: "low",
    assignedTo: MockUsers[3],
  },
  {
    id: "3324",
    title: "third issue",
    description: "second issue of the project...",
    author: MockUsers[2],
    status: "open",
    priority: "low",
    assignedTo: MockUsers[3],
  }
]

export const MockIssues = _issues.map(issueInfo => new MockIssueClass(issueInfo))