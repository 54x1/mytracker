import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Page-Home.vue'
import Login from '../views/Page-Login.vue'
import About from '../views/Page-About'
import { auth } from '../firebase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (auth.currentUser) {
    if (to.matched.some(record => record.meta.requiresAuth) &&  to.path === '/login'){
    next('/')
    return;
  }
}

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return;
  }

  next();
})



export default router
