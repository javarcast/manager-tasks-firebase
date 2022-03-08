import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      isProtected: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit-task',
    component: () => import(/* webpackChunkName: "editTask" */ '../views/EditTask.vue'),
    meta: {
      isProtected: true,
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.isProtected) {
    if(store.getters.isAuth) {
      next();
    } else {
      next('/login');
    }

  }else {
    next();
  }
});

export default router
