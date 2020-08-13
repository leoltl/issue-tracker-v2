import { ShowProject, AddProject, AddProjectMember, RemoveProjectMember } from '../use-cases/project';

export default function addProjectRoute(router) {
  router.get("/projects", async (req, res) => {
    try {
      console.log(req.user)
      const {id: userId, role } = req.user
      res.send(await ShowProject.execute({ userId, role }));
    } catch(e) {
      console.log(e)
      res.status(500).send(e.message)
    }
  });

  router.post("/projects", async (req, res) => {
    try {
      const { id: creatorUserId } = req.user;
      const { projectInfo } = req.body.data;
      res.send(await AddProject.execute({ userSuppliedInfo: projectInfo, userId: creatorUserId }));
    } catch(e) {
      console.log(e)
      res.status(500).send(e.message)
    }
  });

  router.get("/projects/:projectId", async (req, res) => {
    try {
      res.send(await ShowProject.execute({ projectId: req.params.projectId }));
    } catch(e) {
      console.log(e)
      res.status(500).send(e.message)
    }
  });

  router.post("/projects/:projectId/members", async (req, res) => {
    try {
      const { members } = req.body.data;
      res.send(await AddProjectMember.execute(req.params.projectId, members));
    } catch(e) {
      console.log(e)
      res.status(500).send(e.message)
    }
  });

  router.delete("/projects/:projectId/members", async (req, res) => {
    try {
      const { userId } = req.body.data;
      res.send(await RemoveProjectMember.execute(req.params.projectId, userId));
    } catch(e) {
      console.log(e)
      res.status(500).send(e.message)
    }
  });
};