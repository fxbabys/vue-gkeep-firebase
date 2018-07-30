import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import config from './config'
import * as getters from './getters'
import * as actions from './actions'
import * as types from './mutation-types'
import notes from './modules/notes'
import users from './modules/users'

Vue.use(Vuex)
firebase.initializeApp(config)

let db = firebase.database()
let auth = firebase.auth

export default new Vuex.Store({
  getters,
  actions,
  state: {
    alerts: [],
    db,
    auth,
    notesPath: ''
  },
  modules: {
    notes,
    users
  },
  mutations: {
    [types.ACTIVATE_ALERT] (state, alert) {
      state.alerts.push(alert)
    },
    [types.EXPIRE_ALERT] (state) {
      state.alerts.pop()
    },
    [types.SET_NOTES_PATH] (state, path) {
      state.notesPath = path
    }
  }
})
