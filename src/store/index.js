import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    school:'',
    perm:''
  },
  mutations: {
    schoolChange(state,payload){
      state.school = payload
    },
    permChange(state,payload){
      state.perm = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
