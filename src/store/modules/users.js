import * as types from '../mutation-types'

const state = {
  auth: false,
  currentUser: null,
  uid: ''
}

const getters = {
  getUser: state => state.currentUser,
  getAuth: state => state.auth,
  getUid: state => state.uid
}

const mutations = {
  [types.SET_USER] (state, user) {
    state.currentUser = user
    state.auth = !!user
  }
}

const actions = {
  signUpWithPassword ({ commit, state, dispatch, rootState }, credential) {
    rootState.auth().createUserWithEmailAndPassword(credential.email, credential.password)
      .then(res => {
        dispatch('signIn', res.user)
      })
      .catch(error => {
        dispatch('sendAlert', {
          type: 'error',
          message: '创建账号失败: ' + error.message,
          error: error
        }, { root: true })
      })
  },
  signInWithPassword ({ commit, state, dispatch, rootState }, credential) {
    rootState.auth().signInWithEmailAndPassword(credential.email, credential.password)
      .then(res => {
        dispatch('signIn', res.user)
      })
      .catch(error => {
        dispatch('sendAlert', {
          type: 'error',
          message: '登录失败: ' + error.message,
          error: error
        }, { root: true })
      })
  },
  signInWithProvider ({ commit, state, dispatch, rootState }, socialNetwork) {
    let provider
    switch (socialNetwork) {
      case 'google':
        provider = new rootState.auth.GoogleAuthProvider()
        break
    }
    rootState.auth().signInWithPopup(provider)
      .then(res => { dispatch('signIn', res.user) })
      .catch(error => dispatch('sendAlert', { type: 'error', message: '登录失败: ' + error.message }, { root: true }))
  },
  signIn ({ commit, state, dispatch, rootState }, user) {
    console.log(user)
    commit(types.SET_USER, user)
    dispatch('sendAlert', {
      type: 'success',
      message: '登录成功'
    }, { root: true })
    dispatch('setNotesPath', user.uid, { root: true })
    dispatch('attachFirebaseListeners')
  },
  signOut ({ commit, state, dispatch, rootState }) {
    rootState.auth().signOut()
      .then(() => {
        commit(types.SET_USER, null)
        dispatch('sendAlert', { type: 'success', message: '注销成功' }, { root: true })
        dispatch('detachFirebaseListeners')
        dispatch('cleanUp')
      })
      .catch(err => dispatch('sendAlert', { type: 'error', message: '注销失败: ' + err.message }, { root: true }))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
