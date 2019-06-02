// <武上博>
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: require('@/components/Main').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
// </武上博>
