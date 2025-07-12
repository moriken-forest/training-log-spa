<template>
  <div>
    <div id="controls">
      <label>表示件数:
        <select v-model.number="pageSize">
          <option v-for="n in [10,50,100]" :key="n" :value="n">{{ n }}</option>
        </select> 件
      </label>
    </div>
    <LogList :logs="logs" :page-size="pageSize" />
  </div>
</template>

<script>
import LogList from '../components/LogList.vue'

export default {
  components: { LogList },
  data() {
    return { logs: [], pageSize: 10 }
  },
    created() {
      fetch('/logs/index.json')
        .then(r => r.json())
        .then(dates =>
            Promise.all(dates.map(d => fetch(`/logs/${d}.json`).then(r => r.json())))
        )
        .then(arr => this.logs = arr)
  }
}
</script>
