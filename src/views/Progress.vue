<template>
  <div class="embed-container">
    <iframe class="iframe" src="http://10.112.184.214:30090/graph?g0.expr=&g0.tab=1&g0.stacked=0&g0.show_exemplars=0&g0.range_input=1h" ></iframe>
  </div>
</template>
<script>


export default {
  data() {
    return {
      token: "eyJrIjoicVVZSjRiUktoZ3AyMjBtS0dLbDF5MUV1bjFKNnNPMWsiLCJuIjoiY2Nza2V5IiwiaWQiOjF9",
      grafanaContent: ""
    };
  },
  mounted() {
    this.fetchGrafanaContent();
  },
  methods: {

  }
};

</script>


<style lang="less" scoped>


.iframe {
  width: 100%; /* 横向铺满容器 */
  border: none; /* 去除iframe的边框 */
  height: 100%;   
}
.embed-container {
  width: 100%; /* 横向铺满父容器 */
  height: 100%; /* 高度与父容器相同 */
  overflow: hidden; /* 隐藏溢出部分 */
}

</style>

