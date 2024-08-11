//? 基于Vue.js的前端应用程序的入口文件
import Vue from 'vue'
import App from './App.vue'
// import { Row, Button} from 'element-ui'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import router from './router';
import store from './store';
import './api/mock';
import Cookie from 'js-cookie';
import '../src/views/ef/index.css'
import '../static/font_4517509_8ytvr4lpzgn/iconfont.css'
// 全局引入
Vue.use(ElementUI, {size: 'small'})
// 按需引入
// Vue.use(Row)
// Vue.use(Button)

// 添加全局前置导航首尾,确保未登录用户无法访问除登录页外的其他页面。
router.beforeEach((to, from, next) => {
  // 判断token存不存在
  const token = Cookie.get('token')
  // token不存在，说明当前用户未登录，应该跳转至登录页
  if (!token && to.name !== 'login' ){
    next({ name: 'login' })
  } else if (token && to.name === 'login') { // token存在，说明用户登录，此时跳转至首页
    next({name: 'panel'})
  } else {
    next()
  }
})

new Vue({
  router,   //将Vue Router实例注入Vue实例，使得路由功能在整个Vue应用中可用。
  store,    //将Vuex store实例注入Vue实例，使得状态管理功能在整个Vue应用中可用。
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
