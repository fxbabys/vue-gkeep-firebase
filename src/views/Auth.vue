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
			<input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm Password" v-model="confirmPassword">
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

export default {
  data() {
    return {
			email: '',
			password: '',
			confirmPassword: '',
			wantsToSignUp: false
    }
	},
	computed: {
		credential () {
			return { email: this.email, password: this.password }
		},
		authorized () {
			return this.$store.getters.getAuth
		}
	},
	watch: {
		'authorized': {
			handler () {
				if (this.authorized) this.$router.push('Notes')
			}
		}
	},
	methods: {
		signUpWithPassword () {
			if (this.password === this.confirmPassword) {
				this.$store.dispatch('signUpWithPassword', this.credential)
			}
		},
		signInWithPassword () {
			if (this.email.length > 0 && this.password.length > 0) {
				this.$store.dispatch('signInWithPassword', this.credential)
			}
		},
		signInWithProvider (socialNetWork) {
			this.$store.dispatch('signInWithProvider', socialNetWork)
		}
	},
  	components: {

  	}
}
</script>

<style scoped>
.auth-form{
   width: 480px;
   max-width: 100%;
   margin: 25vh auto 15px;
   background: #fff;
   padding: 15px;
   border-radius: 2px;
   box-shadow: 0 1px 5px #ccc;
 }
 .auth-form h1{
	 text-align: center;
   font-weight: 300;
 }
 .auth-form > div {
   margin-top: 15px;
 }
 .auth-form input {
   height: 32px;
	 border: none;
	 outline: 0;
   border-bottom: 2px solid #bbb;
 }
 .auth-form input:focus{
   border-bottom-color: #555;
 }
 .auth-form label, .auth-form input{
   display: block;
   width: 100%;
 }
 .auth-form button {
   font-size: 18px;
   background: #fff;
   border: 1px solid #41b883;
   padding: 4px 6px;
	 margin: 0;
	 outline: 0;
   border-radius: 3px;
 }
 .auth-form .btn-group button{
   border-radius: 3px 0 0 3px;
   width: 50%;
   float: left;
 }
 .auth-form .btn-group button + button{
   border-radius: 0 3px 3px 0;
   border-left: none;
 }
 .auth-form .signup-submit{
   width: 100%;
 }
 .auth-form hr{
   margin-top: 20px;
 }
 .auth-form .social-providers{
   text-align: center;
 }
 .auth-form .social-providers a{
   color: #41b883;
   font-size: 36px;
   padding: 4px;
 }
</style>
