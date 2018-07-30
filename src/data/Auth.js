// import Firebase from 'firebase'

// export default {
//   ref: new Firebase('https://gkeep-vuefire-2c90b.firebaseio.com/'),
//   onAuth (authCallback) {
//     this.ref.onAuth(authCallback)
//   },
//   getAuth () {
//     return this.ref.getAuth()
//   },
//   signInWithPassword (crendentials) {
//     return this.ref.signInWithEmailAndPassword(crendentials.email, crendentials.password)
//   },
//   signUpWithPassword (crendentials) {
//     return this.ref.createUser(crendentials)
//   },
//   signInWithProvider (provider, callback) {
//     this.ref.authWithOAuthPopup(provider, (error, authData) => {
//       if (error && error.code === 'TRANSPORT_UNAVAILABLE') { // fall-back to broswer redirects, pick up the session and automatically back to origin page
//         this.ref.authWithOAuthRedirect(provider, error => {
//           if (callback) callback(error, authData)
//         })
//       } else if (authData) {
//         if (callback) callback(null, authData)
//       }
//     })
//   },
//   signOut () {
//     this.ref.unauth()
//   }
// }
