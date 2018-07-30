/**
 * All the logic to create, update and delete the notes
 */
import Firebase from 'firebase'
import EvenEmitter from 'events'

class NoteRepository extends EvenEmitter {
  constructor () {
    super()
    this.ref = new Firebase('https://gkeep-vuefire-2c90b.firebaseio.com/notes')
  }
  attachFirebaseListeners () {
    this.ref.on('child_added', this.onAdded, this)
    this.ref.on('child_removed', this.onRemoved, this)
    this.ref.on('child_changed', this.onChanged, this)
  }
  detachFirebaseListeners () {
    this.ref.off('child_added', this.onAdded, this)
    this.ref.off('child_removed', this.onRemoved, this)
    this.ref.off('child_changed', this.onChanged, this)
  }
  create ({title = '', content = ''}, onComplete) {
    this.ref.push({title, content}, onComplete)
  }
  update ({key, title = '', content = ''}, onComplete) {
    this.ref.child(key).update({title, content}, onComplete)
  }
  remove ({key}, onComplete) {
    this.ref.child(key).remove(onComplete)
  }
  onAdded (snapshot) {
    let note = this.snapshotToNote(snapshot)
    this.emit('added', note)
  }
  onRemoved (oldSnapshot) {
    let note = this.snapshotToNote(oldSnapshot)
    this.emit('removed', note)
  }
  onChanged (snapshot) {
    let note = this.snapshotToNote(snapshot)
    this.emit('changed', note)
  }
  snapshotToNote (snapshot) {
    let key = snapshot.key()
    let note = snapshot.val()
    note.key = key
    return note
  }
  findIndex (notes, key) {
    return notes.findIndex(note => note.key === key)
  }
  find (notes, key) {
    return notes.find(note => note.key === key)
  }
}

export default new NoteRepository()
