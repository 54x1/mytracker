import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Page-Home.vue'
import Login from '../views/Page-Login.vue'
import About from '../views/Page-About'
import AddItems from '../views/Page-AddItems'
import EditItems from '../views/Page-EditItems'
import { getCurrentUser } from '../firebase'

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
      noAuth: true
    }
  },
  {
    path: '/add-items',
    name: 'additems',
    component: AddItems,
    meta: {
      requiresAuth: true
    }
  },  
  {
    path: '/item/:itemId',
    name: 'edititems',
    component: EditItems,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      noAuth: true,
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach(async(to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const noAuth = to.matched.some(record => record.meta.noAuth)

  const currentUser = await getCurrentUser()


  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (noAuth && currentUser) {
    next('/')
  } else {
    next()
  }
})



export default router
