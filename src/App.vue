<template>
  <div id="app">
    <header class="nav-container">
      <div class="logo">🏋️ PowerLog</div>
        <nav>
          <router-link to="/calendar"><span class="material-icons">calendar_month</span></router-link>
          <router-link to="/list"><span class="material-icons">list</span></router-link>
          <a href="#" @click.prevent="switchUser">
            <span class="material-icons">person</span>
          </a>
          <a href="#" @click.prevent="clearCache"><span class="material-icons">refresh</span></a>
        </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { toggleUser } from './utils/user'

export default {
  name: 'App',
  methods: {
    clearCache() {
      localStorage.clear()
      location.reload()
    },
    switchUser() {
      toggleUser()
      this.clearCache()
    }
  }
}
</script>

