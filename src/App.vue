<template>
  <div id="app">
    <alerts :alerts="alerts"></alerts>
    <router-view></router-view>
  </div>
</template>

<script>
import Alerts from './components/Alerts'

export default {
  name: 'App',
  data () {
    return {
			selectedNote: null,
      alerts: []
    }
  },
  created () {
    this.$eventHub.$on('alert', (alert) => {
      this.alerts.push(alert)
      setTimeout(() => {
        this.alerts.splice(this.alerts.indexOf(alert), 1)
      }, alert.duration || 1500);
    })
    this.$eventHub.$on('note.selected', (note) => {
      console.log(note)
      this.selectedNote = note
    })
  },
	beforeDestroy () {
		this.$eventHub.$off('note.selected')
    this.$eventHub.$off('alert')
	},
  components: {
    Alerts
  }
}
</script>

<style>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html {
    font-family: sans-serif;
  }
  body {
    background: #eee;
    padding: 0 16px;
  }
</style>
