import { createRouter, createWebHashHistory } from 'vue-router'
import CalendarView    from '../views/CalendarView.vue'
import ListView        from '../views/ListView.vue'
import RegisterView    from '../views/RegisterView.vue'
import ChatGPTGuideView from '../views/ChatGPTGuideView.vue'
import VisualChatGPTGuideView from '../views/VisualChatGPTGuideView.vue'
import UsageGuideView from '../views/UsageGuideView.vue'

const routes = [
  { path: '/',        redirect: '/calendar' },
  { path: '/calendar', component: CalendarView },
  { path: '/list/:base?', component: ListView },
  { path: '/register', component: RegisterView },
  { path: '/guide', component: ChatGPTGuideView },
  { path: '/visual-guide', component: VisualChatGPTGuideView },
  { path: '/usage', component: UsageGuideView },
]

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})
