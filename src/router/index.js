import { createRouter, createWebHashHistory } from 'vue-router'
import CalendarView    from '../views/CalendarView.vue'
import ListView        from '../views/ListView.vue'
import RegisterView    from '../views/RegisterView.vue'
import CategoryView    from '../views/CategoryView.vue'
import PromptDocsView  from '../views/PromptDocsView.vue'

const routes = [
  { path: '/',        redirect: '/calendar' },
  { path: '/calendar', component: CalendarView },
  { path: '/list',     component: ListView },
  { path: '/category/:base', component: CategoryView },
  { path: '/register', component: RegisterView },
  { path: '/prompt', component: PromptDocsView }
]

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})
