<template>
    <el-menu 
    default-active="1-4-1" 
    class="el-menu-vertical-demo" 
    @open="handleOpen" 
    @close="handleClose"
    :collapse="isCollapse"
    background-color= black
    text-color="#fff"
    active-text-color= yellow
    >
        <h3 style="font-size: 1.6em;">{{ isCollapse? '系统' : '工业互联网云边端智能管控平台'}}</h3>

        <!-- 用于遍历menudata中所有不含子目录的数据 -->
        <!-- <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item> -->

        <!-- 这个是最上面的默认界面 -->
        <el-menu-item @click="clickMenu(item)" v-for="item in isHome" :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title" style="font-size: 1.6em">{{ item.label }}</span>
        </el-menu-item>

        <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title" >{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
                <el-menu-item  @click="clickMenu(subItem)" :index="subItem.path" style="font-size: 15px;">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <el-menu-item  @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title" style="font-size: 1.6em;">{{ item.label }}</span>
        </el-menu-item>

    </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 1000px;
}
.el-menu{
    height: 100vh;
    h3{
        color: #fff;
        text-align: center;
        line-height: 48px;
    }
}
</style>

<script>
import Cookie from "js-cookie"
export default {
    data() {
        return {
            //将/src/router/index.js里写好的子页面渲染到左边的侧栏，以便点击进入;
            menuData: [
                // {
                //     path: '/',
                //     name: 'home',
                //     label: '首页',
                //     icon: 's-home',
                //     url: 'Home/Home'
                // },
                {
                    path: '/panel',
                    name: 'panel',
                    label: '产线定制',
                    url: 'Panel/Panel'
                },
                {
                    path: '/productionlinemonitoring',
                    name: 'productionlinemonitoring',
                    label: '产线监控',
                    url: 'ProductionLineMonitoring/ProductionLineMonitoring'
                },
                {
                    path: '/ordermanage',
                    name: 'ordermanage',
                    label: '订单管理',
                    url: 'Ordermanage/Ordermanage'
                },
                {
                    path: '/modelmanage',
                    name: 'modelmanage',
                    label: '模型管理',
                    url: 'Modelmanage/Modelmanage'
                },
                {
                    path: '/cloudmonitoring',
                    name: 'cloudmonitoring',
                    label: '资源监控',
                    url: 'CloudMonitoring/CloudMonitoring'
                },
                {
                    path: '/schedulerfront',
                    name: 'schedulerfront',
                    label: '资源调度',
                    url: 'Schedulerfront/Schedulerfront'
                },
                {
                    path: '/videoandthmonitor',
                    name: 'videoandthmonitor',
                    label: '工业安全预警',
                    url: 'VideoAndTHmonitor/VideoAndTHmonitor'
                },
                // {
                //     path: '/test',
                //     name: 'test',
                //     label: 'test',
                //     url: 'Test/Test'
                // }
                // {
                //     path: '/monitor',
                //     name: 'monitor',
                //     label: '业务进度',
                //     url: 'Monitor/Monitor'
                // },
                // {
                //     path: '/modeldetail',
                //     name: 'modeldetail',
                //     label: '模型信息',
                //     url: 'Modeldetail/Modeldetail'
                // },
                // {
                //     path: '/user',
                //     name: 'user',
                //     label: '用户管理',
                //     icon: 'setting',
                //     url: 'UserManage/UserManage'
                // },
                // {
                //     label: '业务状态',
                //     // icon: 'search',
                //     children: [
                //         // {
                //         //     path: '/progress',
                //         //     name: 'progress',
                //         //     label: 'Prometheus',
                //         //     // icon: 'setting',
                //         //     url: 'Other/Progress'
                //         // },
                //         {
                //             path: '/vediolive',
                //             name: 'vediolive',
                //             label: '云状态监控',
                //             // icon: 'setting',
                //             url: 'Other/Vediolive'
                //         }
                //     ]
                // }
                ]
        };
    },

    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        // 点击菜单
        clickMenu(item){
            console.log(item);
            // 当页面的路由与跳转的路由不一致时才允许跳转
            if (this.$route.path !== item.path && !(this.$route.path === '/panel' && (item.path === '/'))){
                if (item.path === '/productionlinemonitoring' ) {
                    const url = 'https://ba9867b91cb84fbf8246995fe84b8f60.canvas.cn-north-4.hwastro.cn/magno/render/share/190b5779786-454af362-0c81-4e5b-b010-1fa9139015c1'; // 替换成你要跳转的 URL
                    window.open(url, '_blank');
                }else {
                    this.$router.push(item.path);
                }
            }
            this.$store.commit('selectMenu', item)
        }

    },

    computed:{
        //用来仅显示首页
        isHome(){
            return this.menuData.filter(item => item.name=='panel')
        },
        //没有子菜单
        noChildren(){
            return this.menuData.filter(item => !item.children && item.name!='panel')
        },
        //有子菜单
        hasChildren(){
            return this.menuData.filter(item => item.children)
        },


        // },
        isCollapse(){
            return this.$store.state.tab.isCollapse
        }
    }
}
</script>
<style lang="less" scoped>
.el-menu{
    border-right: none;

}

</style>