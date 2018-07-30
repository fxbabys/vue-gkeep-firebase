<template>
  <form class="create-note" v-on:submit.prevent="createNote()">
      <input type="text" name="title" placeholder="Title" v-model="title">
      <textarea name="content" id="" rows="3" placeholder="Text goes here…" v-model="content"></textarea>
      <button type="submit">+</button>
  </form>
</template>

<script type="text/ecmascript-6">
import noteRepository from '../../data/NoteRepository'
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
              console.log(this.content)
              noteRepository.create({title: this.title, content: this.content}, err => {
                  if (err) return this.$eventHub.$emit('alert', { type: 'error', message: 'Failed to create note' })
                  this.title = ''
                  this.content = ''
                  this.$eventHub.$emit('alert', { type: 'success', message: 'Note was successfully created' })
              })
          }
      }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.create-note
    position: relative;
    width: 480px;
    margin: 15px auto;
    background: #fff;
    padding: 15px;
    border-radius: 2px;
    box-shadow: 0 1px 5px #ccc;
    input, textarea
        width: 100%;
        border: none;
        padding: 4px;
        outline: none;
        font-size: 1.2em;
    button
        position: absolute;
        right: 18px;
        bottom: -18px;
        background: #41b883;
        color: #fff;
        border: none;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3)
        cursor: pointer;
        outline: none;
</style>
