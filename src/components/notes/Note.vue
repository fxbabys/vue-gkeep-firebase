<template>
  <div class="note">
      <h1>{{ note.title }}</h1>
      <pre>{{ note.content }}</pre>
			<button type="button" v-on:click.stop="remove">
				<i class="fa fa-trash-o" aria-hidden="true"></i>
			</button>
			<button type="button" class="edit" v-on:click.stop="selectNote(note)">
				<i class="fa fa-pencil" arai-hidden="true"></i>
			</button>
  </div>
</template>

<script type="text/ecmascript-6">
import noteRepository from '../../data/NoteRepository'

export default {
	props: ['note'],
  data() {
    return {
    }
	},
	methods: {
		remove () {
			noteRepository.remove(this.note, err => {
				if (err) return this.$eventHub.$emit('alert', { type: 'error', message: 'Failed to remove note' })
			})
		},
    selectNote ({key, title, content}) {
      console.log(this)
			// this.$dispatch('note.selected', {key, title, content})   // inform the parent component
			this.$eventHub.$emit('note.selected', {key, title, content})
    }
	},
  components: {

  }
}
</script>

<style scoped lang="stylus">
	.note
		background-color: #fff;
		border-radius: 2px;
		box-shadow: 0 2px 5px #ccc;
		padding: 10px;
		width: 240px;
		margin: 8px 0;
		transition: box-shadow .5s;
		cursor: default;
		h1
			font-size: 1.1em;
			margin-bottom: 6px;
			word-wrap: break-word;
		pre
			font-size: 1.1em;
			margin-bottom: 10px;
			white-space: pre-wrap;
			word-wrap: break-word;
			font-family: inherit;
		button
			background: none;
			border: none;
			font-size: 20px;
			opacity: 0;
			cursor: pointer;
			transition: opacity .5s;
			margin: 0 4px 0 0;
		button.edit
			float: right;
		&:hover, &:focus
			box-shadow: 0 2px 10px #999;
		&:hover button, &:focus button
			opacity: 0.6;
		button:hover, button:focus
			opacity: 1;
</style>
