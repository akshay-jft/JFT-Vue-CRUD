import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Authentication from '../views/Authentication.vue'
import { projectAuth } from '../../Firebase/config.js'

const requireAuth = (to, from ,next) =>{
  let user = projectAuth.currentUser
  if(!user){
    next({ name : 'Authentication'})
  }else{
    next()
  }
}
const routes = [
  {
    path: '/',
    name: 'Authentication',
    component: Authentication
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    props : true,
    beforeEnter : requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
