<template>
	<div class="alerts">
		<div v-for="(alert, index) in alerts" :key="index" :class="alert.type" transition="expand">
			<p>
				{{ alert.message }}
			</p>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
	props: ['alerts'],
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
.alerts
	position fixed
	top 0
	left 0
	right 0
	z-index 1
	div
		background-color #bbb
		overflow hidden
		.error
			background-color #e03c3c
			color #fff
		.success
			background-color #41b883
			color #fff
	p
		width 30rem
		margin 0 auto
		padding .25rem
		text-align center
.expand-transition
	max-height 12.5rem
	transition max-height 1s ease
.expand-enter, .expand-leave
	max-height 0
</style>
