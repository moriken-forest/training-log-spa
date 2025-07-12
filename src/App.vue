<template>
  <div id="app">
    <header class="nav-container">
      <div class="logo">🏋️ PowerLog</div>
      <nav>
        <router-link to="/calendar"><span class="material-icons">calendar_month</span></router-link>
        <router-link to="/list"><span class="material-icons">list</span></router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default { name: 'App' }
</script>

