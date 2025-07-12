<template>
  <div id="app">
    <header class="nav-container">
      <div class="logo">🏋️ PowerLog</div>
      <nav>
        <router-link to="/calendar">カレンダー</router-link>
        <router-link to="/list">一覧</router-link>
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

