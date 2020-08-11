import addUserRoutes from "./routes/user-routes";
import addProjectRoutes from "./routes/project-routes";
import addIssueRoutes from "./routes/issue-routes";

export default function addRoutes(router) {
  addUserRoutes(router);
  addProjectRoutes(router);
  addIssueRoutes(router);
  return router
}