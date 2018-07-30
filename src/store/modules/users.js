import * as types from '../mutation-types'
// import { errorAlert, successAlert } from '../helpers'

const actions = {
  signUpWithPassword ({ commit, state, dispatch, rootState }, credential) {
    rootState.auth().createUserWithEmailAndPassword(credential.email, credential.password)
      .then(user => {
        dispatch('signIn', user)
      })
      .catch(error => {
        console.log(error)
        dispatch('sendAlert', {
          type: 'error',
          message: '创建账号失败',
          error: error.message
        }, { root: true })
      })
  },
  signIn ({ commit, state, dispatch, rootState }, user) {
    // commit(types.SET_USER, user)
    dispatch('sendAlert', {
      type: 'success',
      message: '登录成功'
    }, { root: true })
    dispatch('attachFirebaseListeners')
  }
}

export default {
  // state,
  // getters,
  actions
  // mutations
}
