import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import Projects from '@/views/Projects.vue'
import Project from '@/views/Project.vue'
import Issue from '@/views/Issue.vue'
import ManageRole from '@/views/ManageRole.vue'
import MyIssue from '@/views/MyIssue.vue'
import PageNotFound from '@/views/PageNotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Home',
    path: '/', redirect: '/projects'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { isFullScreen: true }
  },
  {
    path: '/projects',
    meta: { restricted: true },
    component: Projects,
    name: 'Projects',
    children: [
      { name: 'Project', path: ":projectId", component: Project } 
    ],
  },
  {
    path: '/issues/:issueId',
    name: "Issue",
    meta: { restricted: true },
    component: Issue
  },
  {
    path: '/my-issue',
    name: "MyIssue",
    meta: { restricted: true },
    component: MyIssue
  },
  {
    path: '/manage-role',
    name: "ManageRole",
    meta: { restricted: true},
    component: ManageRole
  },
  {
    path: '*',
    name: "NotFound",
    component: PageNotFound,
    meta: { isFullScreen: true }
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
