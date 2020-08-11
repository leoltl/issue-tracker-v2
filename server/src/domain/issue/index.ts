import mongoId from "../id";
import { buildIssueClass } from "./issue";

export * from "./issue.mock";
export * from "./issue.types";

export const Issue = buildIssueClass({ Id: mongoId });