import { Message } from 'element-ui';
import API from '@/api';

const issue = {
  namespaced: true,
  state: {
    issues: [],
    currentIssue: null,
    currentIssueHistory: [],
    currentIssueComments: [],
    myIssues: [],
  },
  getters: {
    issueData(state, _, __, rootGetters) {
      const data = {...state.currentIssue }
      data.projectId = rootGetters["project/currentProject"].id || ""
      data.authorId = state.currentIssue.author.id
      data.assignedId = state.currentIssue.assignedTo?.id || ""
      return data;
    },
    myIssues(state) {
      return state.myIssues
    }
  },
  mutations: {
    setIssues(state, issues) {
      state.issues = issues
    },
    setCurrentIssue(state, issue) {
      state.currentIssue = issue
    },
    setCurrentIssueHistory(state, issueHistory) {
      state.currentIssueHistory = issueHistory
    },
    setCurrentIssueComments(state, issueComments) {
      state.currentIssueComments = issueComments;
    },
    addComment(state, comment) {
      state.currentIssueComments = [...state.currentIssueComments, comment]
    },
    setMyIssue(state, myIssues) {
      state.myIssues = myIssues
    }
  },
  actions: {
    async getAllIssues({ commit, rootGetters }) {
      try {
        // const { data } = await API.issue.getIssuesForProject(projectId);
        const projectData = rootGetters["project/currentProject"];
        commit('setIssues', projectData.issues);
      } catch (e) {
        console.log(e)
      }
      
    },
    async getIssueDetails({ commit }, ticketId) {
      try {
        if (ticketId == "") { 
          commit ('setCurrentIssue', null) 
          return
        }
        const { data: issue } = await API.issue.getIssue(ticketId);
        // const issue = getters["myIssues"].find(issues => issues._id === ticketId);
        commit('setCurrentIssue', issue);
        this.dispatch('pushRouter', `/issues/${ticketId}`, { root: true })
      } catch(err) {
        console.log(err)
        Message({
          message: "TOIMPROVE: NETWORK REQUEST FAILED"
        })
      }
    },
    async getIssueHistory({ commit }, ticketId) {
      try {
        if (ticketId == "") { 
          commit('setCurrentIssueHistory', []) 
          return
        }
        const { data } = await API.issue.getIssueHistory(ticketId);
        commit('setCurrentIssueHistory', data);
      } catch(err) {
        commit('setCurrentIssueHistory', []);
      }
    },
    async createIssue( _, { formData, loaderCallback }) {
      try {
        const { data: [issue] } = await API.issue.createIssue(formData);
        this.dispatch('pushRouter', `/issues/${issue.issuesUuid}`, { root: true })
      } catch (e) {
        console.log(e)
      } finally {
        loaderCallback && loaderCallback()
      }
    },
    async updateIssue( { commit }, { formData, issuesId, loaderCallback }) {
      try {
        const { data: issue } = await API.issue.updateIssue(formData, issuesId);
        commit('setCurrentIssue', issue)
        // this.dispatch('issue/getIssueHistory', issue.issuesUuid)
      } catch (e) {
        console.log(e)
      } finally {
        loaderCallback && loaderCallback()
      }
    },
    async getAllIssueComments({ commit }, ticketId) {
      try {
        const { data } = await API.issue.getIssueComments(ticketId); 
        commit('setCurrentIssueComments', data);
      } catch (e) {
        commit('setCurrentIssueComments', []);
      }
    },
    async createComment({ commit }, { issueId: ticketId, formData, callback}) {
      try {
        const { data } = await API.issue.createComment(formData, ticketId);
        commit('addComment', data);
        callback && callback();
      } catch(e) {
        console.log(e)
      }
    },
    async getMyIssues({ commit }) {
      try {
        const { data } = await API.issue.getMyIssues();
        commit('setMyIssue', data);
      } catch (e) {
        console.log(e)
      }
    }
  }
}

export default issue