import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import scrollAnimation from './directives/scrollAnimation'

createApp(App)
  .directive('scroll-animation', scrollAnimation)
  .use(router)
  .mount('#app')
