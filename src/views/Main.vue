<template>
  <div class="mainload">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="auto"> 
        <!-- 引入 "CommonAside" 组件，用于显示公共侧边栏。 -->
        <common-aside />
      </el-aside>
      <!-- 主内容区 -->
      <el-container>
        <el-header>
          <!-- 引入 "CommonHeader" 组件，用于显示公共页头。 -->
          <common-header />
        </el-header>
        <!-- 引入 "CommonTag" 组件，用于在页面顶部显示一组标签，用于导航和管理当前打开的页面。 -->
        <common-tag />
        <el-main>
          <!-- 路由出口 -->
          <!-- 路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>
<script>
import CommonAside from '../components/CommonAside.vue';
import CommonHeader from '../components/CommonHeader.vue';
import CommonTag from '../components/CommonTag.vue';
export default {
  data() {
    return {}
  },
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  }
}
</script>

<style scoped>
.el-header {
  padding: 0;
}

.mainload{
  background-color: white; /* 设置背景颜色为白色 */
  width: 100vw; /* 设置宽度为窗口宽度 */
  height: 100vh; /* 设置高度为窗口高度 */
}


</style>