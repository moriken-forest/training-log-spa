<template>
  <div id="app">
    <header class="nav-container">
      <div class="logo">🏋️ PowerLog</div>
        <nav>
          <router-link to="/calendar"><span class="material-icons">calendar_month</span></router-link>
          <router-link to="/list"><span class="material-icons">list</span></router-link>
          <a
            href="https://github.com/moriken-forest/training-log-spa/issues/new?template=training-log.yml"
          ><span class="material-icons">note_add</span></a>
          <a href="#" @click.prevent="clearCache"><span class="material-icons">refresh</span></a>
        </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    clearCache() {
      localStorage.clear()
      location.reload()
    }
  }
}
</script>

