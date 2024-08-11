import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Ordermanage from "../views/OrderManage.vue";
import Monitor from "../views/Monitor.vue";
import Vediolive from "../views/Vediolive.vue";
import Progress from "../views/Progress.vue";
import Login from "../views/Login.vue";
import Modelmanage from "../views/ModelManage.vue";
import Modeldetail from "../views/ModelDetail.vue";
import VideoAndTHmonitor from "@/views/VideoAndTHMonitor.vue";
import Panel from "../views/ef/panel.vue"
import CloudMonitoring from "../views/CloudMonitoring.vue"
import ProductionLineMonitoring from"../views/ProductionLineMonitoring.vue"
import Schedulerfront from"../views/Schedulerfront.vue"
import Test from"../views/Test.vue"
//1、创建路由组件
//2、将路由与组件进行映射
//3、创建router实例子

//告诉 Vue 使用 Vue Router 插件
Vue.use(VueRouter)

//定义了一个名为 routes 的数组，其中包含了应用程序中的所有路由信息
const routes = [
    // 主路由
    {
        path: '/',  //路由的路径，即在浏览器地址栏中显示的路径。
        component: Main,    //该路由所对应的组件。
        name: 'Main',   //路由的名称，用于在代码中引用该路由。
        redirect: '/panel',  //重定向
        children:[
            //子路由
            { path: 'home', name: 'home' ,component: Home }, //首页
            { path: 'user', name: 'user',component: User },  
            { path: 'ordermanage', name:'ordermanage', component: Ordermanage}, 
            { path: 'monitor', name:'monitor', component: Monitor},  
            { path: 'vediolive', name:'vediolive', component: Vediolive }, 
            { path: 'progress', name:'progress', component: Progress }, 
            { path: 'modelmanage', name:'modelmanage', component: Modelmanage },
            { path: 'modeldetail', name:'modeldetail', component: Modeldetail },
            { path: 'videoandthmonitor', name:'videoandthmonitor', component: VideoAndTHmonitor },
            { path: 'panel', name:'panel', component: Panel },
            { path: 'cloudmonitoring', name:'cloudmonitoring', component: CloudMonitoring },
            { 
              path: 'productionlinemonitoring', 
              name:'productionlinemonitoring', 
              component: ProductionLineMonitoring 
            },
            { 
              path: 'schedulerfront', 
              name:'schedulerfront', 
              component: Schedulerfront 
            },
            { 
              path: 'test', 
              name:'test', 
              component: Test 
            }
            //在这里构建路径，path、name是自定义的子页名称名，组件component是/src/views/XX.vue下的XX,例如Monitor.vue就填Monitor
            //新增一个页面:{ path: '123456', name:'123456', component: XX },
        ]
    },
    {
      path: '/login',
      name: 'login',
      component : Login
    }
  ]

//创建一个 VueRouter 实例，传入上述定义好的路由数组
  const router = new VueRouter({
    routes 
  })
//将创建好的路由实例导出，以便在应用的其他地方使用
export default router



