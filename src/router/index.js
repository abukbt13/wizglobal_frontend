import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import Login from '../Auth/Login.vue'
import Register from '../Auth/Register.vue'
import Dashboard from '../components/Dashboard.vue'
import Analysis from "../components/Analysis.vue";

// Import your pages (components)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
    {
    path: '/login',
    component: Login,
  },
    {
    path: '/register',
    component: Register,
  },
    {
    path: '/dashboard',
    component: Dashboard,
  },
    {
    path: '/analysis',
    component: Analysis,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
