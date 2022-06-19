import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Page-Home.vue'
import Login from '../views/Page-Login.vue'
import About from '../views/Page-About'
import CreateItem from '../views/Page-CreateItem'
import EditItem from '../views/Page-EditItem'
import Item from '../views/Page-Item'
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
    component: About
  },
  {
    path: '/create',
    name: 'createitem',
    component: CreateItem,
    meta: {
      requiresAuth: true
    }
  },  
  {
    path: '/edit/:itemId',
    name: 'edititem',
    component: EditItem,
    meta: {
      requiresAuth: true
    }
  },  
  {
    path: '/item/:itemId',
    name: 'item',
    component: Item,
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
