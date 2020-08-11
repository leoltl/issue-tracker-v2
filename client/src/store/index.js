import Vue from 'vue';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync'
import router from '@/router'
import auth from './modules/auth';
import issue from './modules/issue';
import project from './modules/project';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    issue,
    project,
    user,
  },
  actions: {
    pushRouter(_, path) {
      router.push(path)
        .catch(e => { 
          if (e.name == 'NavigationDuplicated') { return }
          console.log(e)
        })
    },
    goRouter(_, path) {
      router.go(path);
    },
  }
})

sync(store, router)

export default store;