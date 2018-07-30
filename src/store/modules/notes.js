import * as types from '../mutation-types'

const state = {}

const getters = {}

const actions = {
  attachFirebaseListeners ({ state, commit, rootState, dispatch }) {
    console.log(rootState)
  }
}

export default {
  state,
  getters,
  actions
}
