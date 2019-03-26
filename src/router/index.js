import Vue from 'vue'
import Router from 'vue-router'

const HelloWorld = r => require.ensure([], () => r(require('@/view/HelloWorld')), 'HelloWorld')
const Home = r => require.ensure([], () => r(require('@/view/Home')), 'Home')

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'HelloWorld', component: HelloWorld },
    { path: '/home', name: 'Home', component: Home }
  ]
})
