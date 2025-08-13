<template>
  <div id="app">
    <header class="nav-container">
      <div class="logo">🏋️ PowerLog</div>
        <nav>
          <router-link to="/calendar"><span class="material-icons">calendar_month</span></router-link>
          <router-link to="/list"><span class="material-icons">list</span></router-link>
          <router-link to="/guide"><span class="material-icons">help</span></router-link>
          <a href="#" @click.prevent="toggleUserMenu">
            <span class="material-icons">person</span>
          </a>
          <div v-if="userMenu" class="user-menu">
            <button v-for="u in users" :key="u" @click="selectUser(u)">{{ u }}</button>
          </div>
          <a href="#" @click.prevent="clearCache"><span class="material-icons">refresh</span></a>
        </nav>
    </header>
    <main>
      <router-view />
    </main>
    <PastLogsModal />
  </div>
</template>

<script>
import { getUsers, setUser } from './utils/user'
import PastLogsModal from './components/PastLogsModal.vue'

export default {
  name: 'App',
  components: { PastLogsModal },
  data() {
    return {
      userMenu: false,
      users: getUsers()
    }
  },
  methods: {
    clearCache() {
      const user = localStorage.getItem('log-user')
      localStorage.clear()
      if (user) {
        localStorage.setItem('log-user', user)
      }
      location.reload()
    },
    toggleUserMenu() {
      this.userMenu = !this.userMenu
    },
    selectUser(user) {
      setUser(user)
      this.userMenu = false
      this.clearCache()
    }
  }
}
</script>

