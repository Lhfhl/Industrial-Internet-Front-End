<template>
  <div id="app">

    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<!-- 对vue模板的默认样式进行清除 -->
<style lang="less">

html {
  height: 100%;
  margin: 0;

}
body{

}
h3,
p {
  margin: 0;
  padding: 0;
}
</style>


