<template>
  <div>
		<CreateNoteForm></CreateNoteForm>
		<Notes></Notes>
		<UpdateModal :note.sync="selectedNote"></UpdateModal>
  </div>
</template>

<script type="text/ecmascript-6">
import Notes from '@/components/notes/Index'
import CreateNoteForm from '@/components/notes/Create'
import UpdateModal from '@/components/notes/UpdateModal'

export default {
  data() {
    return {
			selectedNote: null
    }
	},
	created () {
    this.$eventHub.$on('note.selected', (note) => {
      console.log(note)
      this.selectedNote = note
    })
	},
	beforeDestory () {
		this.$eventHub.$off('note.selected')
	},
  components: {
		Notes,
		CreateNoteForm,
		UpdateModal
  }
}
</script>

<style scoped lang="stylus">
</style>
