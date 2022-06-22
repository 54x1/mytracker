import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Page-Home.vue'
import Login from '../views/Page-Login.vue'
import About from '../views/Page-About'
import Add from '../views/Page-Add'
import Create from '../views/Page-Create'
import Edit from '../views/Page-Edit'
import EditCat from '../views/Page-EditCat'
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
    path: '/add/:catId',
    name: 'add',
    component: Add,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/create',
    name: 'create',
    component: Create,
    meta: {
      requiresAuth: true
    }
  },  
  {
    path: '/edit/:itemId',
    name: 'edit',
    component: Edit,
    meta: {
      requiresAuth: true
    }
  },    
  {
    path: '/category/:catId',
    name: 'editCat',
    component: EditCat,
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
