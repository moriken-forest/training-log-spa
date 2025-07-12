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

<style>
:root {
  --primary: #3b82f6;
  --primary-dark: #2563eb;
  --bg: #f3f4f6;
  --card-bg: #ffffff;
  --text: #1f2937;
  --muted: #6b7280;
  --border: #e5e7eb;
  --shadow: rgba(0,0,0,0.1);
  --radius: 8px;
  --spacing: 16px;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
}
header {
  background: var(--card-bg);
  box-shadow: 0 2px 4px var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}
.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing);
}
.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}
nav a {
  margin-left: var(--spacing);
  text-decoration: none;
  font-weight: 500;
  color: var(--muted);
  transition: color 0.2s;
}
nav a:hover { color: var(--text); }
main {
  max-width: 1200px;
  margin: var(--spacing) auto;
  padding: 0 var(--spacing);
}
</style>
