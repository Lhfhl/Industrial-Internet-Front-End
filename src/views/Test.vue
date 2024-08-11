<template>
  <div id="app">
    <header>
      <h1>动态数据与时间轴图表</h1>
    </header>
    <main>
      <DynamicChart />
    </main>
  </div>
</template>

<script>
import DynamicChart from '@/components/chart/DynamicChart.vue';

export default {
  components: {
    DynamicChart,
  },
};
</script>

<style>

header {
  background-color: #42b983;
  padding: 20px;
  color: white;
}

main {
  padding: 20px;
}
</style>
