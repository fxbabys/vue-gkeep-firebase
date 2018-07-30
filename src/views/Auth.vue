<template>
	<form class="auth-form" @submit.prevent="wantsToSignUp ? signUpWithPassword() : signInWithPassword()">
		<h1>{{ wantsToSignUp ? 'Sign Up' : 'Sign In' }}</h1>
		<div>
			<label for="eamil">Email</label>
			<input type="email" name="email" id="email" placeholder="Email" required="required" v-model="email">
		</div>
		<div>
			<label for="password">Password</label>
			<input type="password" name="password" id="password" placeholder="Password" required="required" v-model="password">
		</div>
		<div v-show="wantsToSignUp">
			<label for="confirm-password">Confirm Password</label>
			<input type="password" name="confirm-password" id="confirm-password" v-model="confirmPassword">
		</div>
		<div v-show="!wantsToSignUp" class="clearfix btn-group">
			<button type="submit">Sign in</button>
			<button type="button" @click="wantsToSignUp = true">Sign up</button>
		</div>
		<div v-show="wantsToSignUp">
			<button type="submit" class="signup-submit">Sign up</button>
		</div>
		<hr>
		<div class="social-providers">
			<a href="" @click.prevent="signInWithProvider('facebook')"><i class="fa fa-facebook-square" aria-hidden="true"></i></a>
			<a href="" @click.prevent="signInWithProvider('twitter')"><i class="fa fa-twitter-square" aria-hidden="true"></i></a>
			<a href="" @click.prevent="signInWithProvider('google')"><i class="fa fa-google-plus-square" aria-hidden="true"></i></a>
			<a href="" @click.prevent="signInWithProvider('github')"><i class="fa fa-github-square" aria-hidden="true"></i></a>
		</div>
	</form>
</template>

<script type="text/ecmascript-6">
import Auth from '@/data/Auth'

export default {
  data() {
    return {
			email: '',
			password: '',
			confirmPassword: '',
			wantsToSignUp: false
    }
	},
	methods: {
		signUpWithPassword () {
			// if (this.password === this.confirmPassword) {
			// 	Auth.signUpWithPassword({
			// 		email: this.email,
			// 		password: this.password
			// 	})
			// 	.then(userData => this.signInWithPassword())
			// 	.then(() => this.$eventHub.$emit('alert', { type: 'success', message: 'Signed up successfully' }))
			// 	.catch(error => this.$eventHub.$emit('alert', { type: 'error', message: error.message }))
			// }
			if (this.password === this.confirmPassword) {
				this.$store.dispatch('signUpWithPassword', { email: this.email, password: this.password })
			}
		},
		signInWithPassword () {
			return Auth.signInWithPassword({
				email: this.email,
				password: this.password
			})
			.then(userData => {
				this.$eventHub.$emit('alert', { type: 'success', message: 'Signed in successfully' })
				this.onSignedIn()
				return userData
			})
			.catch(error => this.$eventHub.$emit('alert', { type: 'error', message: error.message }))
		},
		signInWithProvider (provider) {
			Auth.signInWithProvider(provider, (error, authData) => {
				if (error) this.$eventHub.$emit('alert', { type: 'error', message: error.message })
				this.onSignedIn()
			})
		},
		onSignedIn () {
			this.$router.go({ name: 'notes' })
		}
	},
  components: {

  }
}
</script>

<style scoped lang="stylus">
.auth-form
	width 30rem
	max-width 100%
	margin 25vh auto .9375rem
	background #fff
	padding .9375rem
	border-radius .125rem
	box-shadow 0 1px 5px #ccc
	h1
		font-weight 300
	div
		margin-top .9375rem
	input
		height 2rem
		border none
		border-bottom 2px solid #bbb
		&:focus
			border-bottom-color: #555
	label, input
		display block
		width 100%
	button
		font-size 1.125rem
		background #fff
		border 1px solid #41b883
		padding 4px 6px
		margin 0
		border-radius .1875rem
	.btn-group button
		border-raidus .1875rem 0 0 .1875rem
		width 50%
		float left
		& + button
			border-radius 0 .1875rem .1875rem 0
			border-left none
	.signup-submit
		width 100%
	hr
		margin-top 1.25rem
	.social-providers
		text-align center
		a
			color #41b883
			font-size 2.25rem
			padding .25rem
</style>
