import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/notes',
    name: 'Index',
    component: () => import(`@/views/Notes`),
    meta: {
      authRequired: true
    }
  }, {
    path: '/auth',
    name: 'Auth',
    alias: '/',
    component: () => import(`@/views/Auth`)
  }]
})
