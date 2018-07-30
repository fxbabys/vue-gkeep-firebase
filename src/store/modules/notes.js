import * as types from '../mutation-types'

const state = {
  notes: [],
  selectedNote: null,
  searchQuery: '',
  notesRepo: null
}

const getters = {
  getSelectedNote: state => state.selectedNote,
  getNotes: state => state.notes,
  getSearchQuery: state => state.searchQuery
}

const mutations = {
  [types.SELECT_NOTE] (state, note) {
    state.selectedNote = note
  },
  [types.UNSELECT_NOTE] (state, note) {
    state.selectedNote = null
  },
  [types.CREATE_NOTE] (state, note) {
    state.notes.unshift(note)
  },
  [types.DELETE_NOTE] (state, oldNote) {
    state.notes = state.notes.filter(note => note.key !== oldNote.key)
  },
  [types.UPDATE_NOTE] (state, note, indexToUpdate) {
    state.notes[indexToUpdate] = note
  },
  [types.CLEAN_UP_NOTES] (state) {
    state.notes = []
    state.selectedNote = null
  },
  [types.SET_SEARCH_QUERY] (state, searchQuery) {
    state.searchQuery = searchQuery
  }
}

const actions = {
  attachFirebaseListeners ({ state, commit, rootState, dispatch }) {
    console.log(rootState)
    state.notesRepo = rootState.db.ref(rootState.notesPath)
    state.notesRepo.on('child_added', snapshot => { dispatch('onNoteAdded', snapshot) })
    state.notesRepo.on('child_removed', snapshot => { dispatch('onNoteDeleted', snapshot) })
    state.notesRepo.on('child_changed', snapshot => { dispatch('onNoteUpdated', snapshot) })
  },
  detachFirebaseListeners ({ state, commit, rootState, dispatch }) {
    state.notesRepo.off('child_added')
    state.notesRepo.off('child_removed')
    state.notesRepo.off('child_changed')
  },
  onNoteAdded ({ state, commit, rootState, dispatch }, snapshot) {
    dispatch('snapshotToNote', snapshot).then(note => {
      commit(types.CREATE_NOTE, note)
    })
  },
  onNoteDeleted ({ state, commit, rootState, dispatch }, snapshot) {
    dispatch('snapshotToNote', snapshot).then(note => {
      commit(types.DELETE_NOTE, note)
    })
  },
  onNoteUpdated ({ state, commit, rootState, dispatch }, snapshot) {
    dispatch('snapshotToNote', snapshot).then(note => {
      let indexToUpdate = state.notes.findIndex(t => t.key === note.key)
      commit(types.UPDATE_NOTE, note, indexToUpdate)
    })
  },
  snapshotToNote ({ state, commit, rootState, dispatch }, snapshot) {
    // console.log(snapshot)
    let key = snapshot.key
    let note = snapshot.val()
    note.key = key
    return note
  },
  createNote ({ state, commit, rootState, dispatch }, note) {
    // console.log(this.$store.users.uid)
    state.notesRepo.push(note)
      .then(() => { dispatch('sendAlert', { type: 'success', message: '笔记新增成功' }, { root: true }) })
      .catch(err => { dispatch('sendAlert', { type: 'error', message: '笔记新增失败: ' + err.message }, { root: true }) })
  },
  deleteNote ({ state, commit, rootState, dispatch }, { key, title = '', content = '' }) {
    console.log(key)
    state.notesRepo.child(key).remove()
      .then(() => { dispatch('sendAlert', { type: 'success', message: '笔记删除成功' }, { root: true }) })
      .catch(err => { dispatch('sendAlert', { type: 'error', message: '笔记删除失败: ' + err.message }, { root: true }) })
  },
  updateNote ({ state, commit, rootState, dispatch }, { key, title = '', content = '' }) {
    state.notesRepo.child(key).update({ title, content })
      .then(() => { dispatch('sendAlert', { type: 'success', message: '笔记更新成功' }, { root: true }) })
      .catch(err => dispatch('sendAlert', { type: 'error', message: '笔记更新失败: ' + err.message }, { root: true }))
  },
  cleanUp ({ state, commit, rootState, dispatch }) {
    commit(types.CLEAN_UP_NOTES)
  },
  filterNotes ({ state, commit, rootState, dispatch }, searchQuery) {
    commit(types.SET_SEARCH_QUERY, searchQuery)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
