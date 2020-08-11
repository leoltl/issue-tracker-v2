import { AddIssue, EditIssue, CloseIssue, ShowIssue, ListIssue } from '../use-cases/issue';

export default function addIssueRoutes(router) {
  router.get("/issues/:issueId", async (req, res) => {
    res.send(await ShowIssue.execute(req.params.issueId));
  });

  router.post("/issues/new", async (req, res) => {
    const { issuesInfo, projectId } = req.body.data;
    issuesInfo.author = req.user.id;
    res.send(await AddIssue.execute(issuesInfo, projectId));
  });

  router.put("/issues/:issueId", async (req, res) => {
    const { issuesInfo } = req.body.data;
    issuesInfo.author = req.user.id;
    res.send(await EditIssue.execute(issuesInfo));
  });

  router.get("/issues", async (req, res) => {
    res.send(await ListIssue.execute({ me: req.user.id }));
  });
};