import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

const TOKEN = 'TOUTIAO_USER'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN),
    info: 'hello,vuex'
  },
  getters: {},
  mutations: {
    SETUSER(state, user) {
      state.user = user
      setItem(TOKEN, state.user)
    }
  },
  actions: {},
  modules: {}
})
