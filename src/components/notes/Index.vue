<template>
  <div class="notes" ref="notes">
      <note v-for="(note, index) in notes" :key="index" :note="note" @click="selectNote(note)">
      </note>
  </div>
</template>

<script>
import Masonry from 'masonry-layout'
import Note from './Note'
import noteRepository from '../../data/NoteRepository'
export default {
  data () {
    return {
      notes: [],
      masonry: null
    }
  },
  watch: {
    'notes': {  // watch the notes array for changes
      handler () {
        console.log(this)
        this.masonry.reloadItems()
        this.masonry.layout()
      },
      deep: true  // watch changed inside individual notes
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.masonry = new Masonry(this.$refs.notes, {
        itemSelector: '.note',
        columnWidth: 240,
        gutter: 16,
        fitWidth: true
      })
      noteRepository.on('added', note => {
        console.log('add success');
        this.notes.unshift(note)
      })
      noteRepository.on('changed', ({key, title, content}) => {
        let outdatedNote = noteRepository.find(this.notes, key)
        outdatedNote.title = title
        outdatedNote.content = content
      })
      noteRepository.on('removed', ({key}) => {
        let noteToRemove = noteRepository.findIndex(this.notes, key)
        this.notes.splice(noteToRemove, 1)
      })
      noteRepository.attachFirebaseListeners()
    })
  },
  methods: {
  },
  components: {
    Note
  }
}
</script>

<style scoped lang="stylus">
.notes
    margin: 0 auto;
</style>
