<template>
  <div class="notes" ref="notes">
      <note v-for="(note, index) in notes" :key="index" :note="note">
      </note>
  </div>
</template>

<script>
import Masonry from 'masonry-layout'
import Note from './Note'

export default {
  data () {
    return {
      masonry: null
    }
  },
  computed: {
    searchQuery () {
      return this.$store.getters.getSearchQuery
    },
    notes () {
      let notes = this.$store.getters.getNotes
      console.log(this.$store)
      if (this.searchQuery.length === 0) return notes
      else return notes.filter(note => note.title.indexOf(this.searchQuery) !== -1 || note.content.indexOf(this.searchQuery) !== -1)
    }
  },
  watch: {
    'notes': {  // watch the notes array for changes
      handler () {
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
