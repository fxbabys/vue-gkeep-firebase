<template>
  <form class="create-note" v-on:submit.prevent="createNote()">
      <input type="text" name="title" placeholder="Title" v-model="title">
      <textarea name="content" id="" rows="3" placeholder="Text goes here…" v-model="content"></textarea>
      <button type="submit">+</button>
  </form>
</template>

<script type="text/ecmascript-6">
// import noteRepository from '../../data/NoteRepository'
export default {
  data() {
    return {
        title: '',
        content: ''
    }
  },
  methods: {
    createNote () {
      if (this.title.trim() || this.content.trim()) {
        this.$store.dispatch('createNote', { title: this.title, content: this.content })
        this.title = ''
        this.content = ''
      }
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
form
  &.create-note
    position relative
    width 480px
    margin 90px auto
    background #fff
    padding 15px
    border-radius 2px
    box-shadow 0 1px 5px #ccc
    button
      position absolute
      right 18px
      bottom -18px
      background #41b883
      color #fff
      border none
      border-radius 50%
      width 36px
      height 36px
      box-shadow 0 1px 3px rgba(0,0,0,0.3)
      cursor pointer
      outline none
form.create-note input, form.create-note textarea
  width 100%
  border none
  padding 4px
  outline none
  font-size 1.2em
</style>
