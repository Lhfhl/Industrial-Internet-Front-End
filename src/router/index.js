import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Preprocess from "../views/Preprocess.vue";
import Extraction from "../views/Extraction.vue";
import Static from "../views/Static.vue";
import Dynamic from "../views/Dynamic.vue";
import Login from "../views/Login.vue";

//1、创建路由组件
//2、将路由与组件进行映射
//3、创建router实例子

Vue.use(VueRouter)

const routes = [
    // 主路由
    {
        path: '/',
        component: Main,
        name: 'Main',
        redirect: '/home',  //重定向
        children:[
            // 子路由
            // { path: 'home', name: 'home' ,component: Home }, //首页
            // { path: 'user', name: 'user',component: User },  //用户管理
            // { path: 'preprocess', name:'preprocess', component: Preprocess}, //日志预处理
            // { path: 'extraction', name:'extraction', component: Extraction},  //微服务候选者提取
            // { path: 'static', name:'static', component: Static }, //静态分析
            // { path: 'dynamic', name:'dynamic', component: Dynamic }, //动态分析

            
        ]
    },
    {
      path: '/login',
      name: 'login',
      component : Login
    }
  ]


  const router = new VueRouter({
    routes 
  })

export default router



