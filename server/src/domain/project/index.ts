import mongoId from "../id";
import { buildProject } from "./project";

export * from "./project.mock";
export * from "./project.types";

export const Project = buildProject({ Id: mongoId });