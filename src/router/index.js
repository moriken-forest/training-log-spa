import { createRouter, createWebHashHistory } from 'vue-router'
import CalendarView from '../views/CalendarView.vue'
import ListView     from '../views/ListView.vue'

const routes = [
  { path: '/',        redirect: '/calendar' },
  { path: '/calendar', component: CalendarView },
  { path: '/list',     component: ListView }
]

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})
