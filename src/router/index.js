import Vue from 'vue'
import VueRouter from 'vue-router'
/* import { component } from 'vue/types/umd' */
import Login from '../components/login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Report from '../components/report/Report.vue'
import Roles from '../components/report/Roles.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: Login,
      component: resolve => require(['../components/login.vue'], resolve)
    },
    { path: '/', redirect: '/login' },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/reports', component: Report },
        { path: '/roles', component: Roles }
      ]
    }
  ]
})

/* 挂载路由导航守卫 */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  /* 获取token */
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
