import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import homepage from '@/components/homepage'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: homepage
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
