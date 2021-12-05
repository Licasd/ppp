import Vue from 'vue'
import Vuex from 'vuex'
import postList from './modules/postList'
import postContent from './modules/postContent'
import user from './modules/user'
import login from './modules/login'
import information from './modules/information'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    postList,
    postContent,
    user,
    login,
    information,
  }
})
