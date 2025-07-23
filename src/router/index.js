import { createRouter, createWebHashHistory } from 'vue-router'
import CalendarView    from '../views/CalendarView.vue'
import ListView        from '../views/ListView.vue'
import RegisterView    from '../views/RegisterView.vue'

const routes = [
  { path: '/',        redirect: '/calendar' },
  { path: '/calendar', component: CalendarView },
  { path: '/list/:base?', component: ListView },
  { path: '/register', component: RegisterView },
]

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})
