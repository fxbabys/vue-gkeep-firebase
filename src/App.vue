<template>
  <div id="app">
    <HeaderBar></HeaderBar>
    <alerts :alerts="activatedAlerts"></alerts>
    <router-view></router-view>
  </div>
</template>

<script>
import Alerts from './components/Alerts'
import HeaderBar from './components/HeaderBar'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    activatedAlerts () {
      return this.$store.getters.getActivatedAlerts
    }
  },
  components: {
    Alerts,
    HeaderBar
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
