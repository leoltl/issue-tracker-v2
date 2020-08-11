export default function mongoDatabase(dbConnection) {
  const { User, Issue, Project } = dbConnection.models;

  async function insertIssue (issueData, projectId) {
    var newIssue = new Issue(issueData);
    newIssue.save();
    Project.findOneAndUpdate({ _id: projectId }, { $push: { issues: newIssue } }).exec();
    return newIssue
  }
  async function updateIssue (issue, projectId) {
    const query = { _id: issue.id };
    var oldOne = await Project.findOne({ issues: issue.id })
    if (oldOne._id != projectId) {
       // remove issue from original project
      Project.findOneAndUpdate({ _id: oldOne._id }, { $pull: { issues: issue.id }}).exec();
      // add issue to project
      Project.findOneAndUpdate({ _id: projectId }, { $push: { issues: issue.id } }).exec();
    }
    return await Issue.findOneAndUpdate(query, issue, { new: true })
    .populate({ path: "author", select: "-hashedPassword"})
    .populate({ path: "assignedTo", select: "-hashedPassword"});
  }
  async function findIssueById (_id) {
    return await Issue.findOne({ _id })
  }
  async function findIssue(conditions: any={}) {
    if (conditions.me) {
      return await Issue.find()
      .or([{ author: conditions.me }, { assignedTo: conditions.me }])
      .populate({ path: "author", select: "-hashedPassword"})
      .populate({ path: "assignedTo", select: "-hashedPassword"})
    }
    return await Issue.find(conditions)
      .populate({ path: "author", select: "-hashedPassword"})
      .populate({ path: "assignedTo", select: "-hashedPassword"})
  }
  async function updateProjectMembership (project) {
    const query = { _id: project.id };
    const { issues, members, ...rest } = project;
    const persistableProject = {
      ...rest,
      issues: issues.map(issue => issue.id),
      members: members.map(member => member.id)
    }
    return await Project.findOneAndReplace(query, persistableProject, { new: true })
      .populate({ path: "issues" })
      .populate({ path: "members", select: "-hashedPassword"})
  }
  async function findAllProject({ userId }, isAdmin=false) {

    return await isAdmin ? Project.find() : Project.find({ members: userId });
  }
  async function findProjectById (_id) {
    return await Project.findOne({ _id })
  }
  async function insertProject(projectData) {
    var newProject = new Project(projectData);
    newProject.save();
    return newProject;
  }
  async function findUserByUsername (username) {
    return await User.findOne({ username })
  }
  async function findUserById (_id) {
    return await User.findOne({ _id });
  }
  async function findUsers(conditions) {
    return await User.find(conditions)
  }

  return {
    insertIssue,
    updateIssue,
    findIssueById,
    findIssue,
    updateProjectMembership,
    findAllProject,
    insertProject,
    findProjectById,
    findUserByUsername,
    findUserById,
    findUsers
  }
};