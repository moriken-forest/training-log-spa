import { createRouter, createWebHashHistory } from 'vue-router'
import CalendarView    from '../views/CalendarView.vue'
import ListView        from '../views/ListView.vue'
import RegisterView    from '../views/RegisterView.vue'
import ChatGPTGuideView from '../views/ChatGPTGuideView.vue'

const routes = [
  { path: '/',        redirect: '/calendar' },
  { path: '/calendar', component: CalendarView },
  { path: '/list/:base?', component: ListView },
  { path: '/register', component: RegisterView },
  { path: '/guide', component: ChatGPTGuideView },
]

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})
