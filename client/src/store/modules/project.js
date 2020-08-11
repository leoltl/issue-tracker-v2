import API from "@/api";
import { Message } from "element-ui";

const project = {
  namespaced: true,
  state: {
    projects: [],
    currentProjectID: "",
    projectMembers: [],
  },
  getters: {
    currentProject(state) {
      return state.projects.find(project => project.id == state.currentProjectID) || ""
    },
    projectOptions(state) {
      return state.projects.map(project => {
        return {
          name: project.name,
          value: project.id
        }
      })
    },
    usersNotInCurrentProject(state, _,__, getters) {
      var projectMembers = getters['project/currentProject'].members.map(user => user.id || user._id);
      return getters["user/allUsers"].filter(user => !projectMembers.includes(user.id))
    }
  },
  mutations: {
    createProject(state, project){
      state.projects = [...state.projects, project]
    },
    setProjects(state, projects) {
      state.projects = projects;
    },
    setCurrentProject(state, id) {
      state.currentProjectID = id
    },
  },
  actions: {
    async createProject({ commit }, projectInfo) {
      const { data: project } = await API.project.createProject(projectInfo);
      commit("createProject", project)
    },
    async getAllProjects({ commit }, { next=null }={}) {
      const { data } = await API.project.getUserProjects();
      if (next) {
        next()
      }
      commit("setProjects", data)
    },
    setCurrentProject({ commit }, projectId) {
      commit("setCurrentProject", projectId);
      if (projectId == "") return;
      this.dispatch("issue/getAllIssues", null , { root: true });
      this.dispatch("pushRouter", `/projects/${projectId}`, { root: true });
    },
    async updateProjectMember({ getters }, { formData, projectId, callback}) {
      try {
        const { data } = await API.project.updateProjectMember(formData, projectId);
        //  TODO move to a mutation
        getters.currentProject.members = data.members
      } catch (e) {
        if (e.response.status == 403) {
          Message({
            message: "You do not have permission to perform this action. Please contact admin.",
            type: "warning",
            showClose: true,
          })
        }
      } finally {
        if (callback) { callback() }
      }
    },
    async deleteProjectMember({ getters }, { userId, projectId }) {
      try {
        const { data } = await API.project.deleteProjectMember(userId, projectId);
        //  TODO move to a mutation
        getters.currentProject.members = data.members
      } catch (e) {
        if (e.response.status == 403) {
          Message({
            message: "You do not have permission to perform this action. Please contact admin.",
            type: "warning",
            showClose: true,
          })
        }
        console.log(e)
      }
    }
  },
}

export default project;