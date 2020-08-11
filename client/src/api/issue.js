const issue = (axios) => ({
  async getIssuesForProject(projectId) {
    return await axios.get(`/projects/${projectId}/issues`);
  },
  async getIssue(issueId) {
    return await axios.get(`/issues/${issueId}`);
  },
  async getIssueHistory(issueId) {
    return await axios.get(`/issues/${issueId}/history`);
  },
  async createIssue(formData) {
    const { projectId, ...rest } = formData;
    return await axios.post(`/issues/new`, { data: {
      issuesInfo: rest,
      projectId
    } });
  },
  async updateIssue(formData, issueId) {
    return await axios.put(`/issues/${issueId}`, { data: { issuesInfo: formData } });
  },
  async getIssueComments(issueId) {
    return await axios.get(`/issues/${issueId}/comments`);
  },
  async createComment(formData, issueId) {
    return await axios.post(`/issues/${issueId}/comments`, { data: formData });
  },
  async getMyIssues() {
    return await axios.get(`/issues`);
  }
})

export default issue;