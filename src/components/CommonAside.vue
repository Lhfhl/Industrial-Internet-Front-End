<template>
    <el-menu 
    default-active="1-4-1" 
    class="el-menu-vertical-demo" 
    @open="handleOpen" 
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    >
        <h3>{{ isCollapse? '系统' : '基于程序分析的微服务候选者提取系统'}}</h3>

        <!-- 用于遍历menudata中所有不含子目录的数据 -->
        <!-- <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item> -->


        <el-menu-item @click="clickMenu(item)" v-for="item in isHome" :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>

        <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
                <el-menu-item  @click="clickMenu(subItem)" :index="subItem.path">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <el-menu-item  @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>

    </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
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
            // menuData: [
            //     {
            //         path: '/',
            //         name: 'home',
            //         label: '首页',
            //         icon: 's-home',
            //         url: 'Home/Home'
            //     },
            //     {
            //         path: '/preprocess',
            //         name: 'preprocess',
            //         label: '日志预处理模块',
            //         icon: 'date',
            //         url: 'LogManage/Preprocess'
            //     },
            //     {
            //         path: '/extraction',
            //         name: 'extraction',
            //         label: '微服务候选者提取模块',
            //         icon: 'success',
            //         url: 'LogManage/Extraction'
            //     },
            //     {
            //         path: '/user',
            //         name: 'user',
            //         label: '用户管理',
            //         icon: 'setting',
            //         url: 'UserManage/UserManage'
            //     },
            //     {
            //         label: '程序分析模块',
            //         icon: 'search',
            //         children: [
            //             {
            //                 path: '/static',
            //                 name: 'static',
            //                 label: '静态分析模块',
            //                 icon: 'setting',
            //                 url: 'Other/Static'
            //             },
            //             {
            //                 path: '/dynamic',
            //                 name: 'dynamic',
            //                 label: '动态分析模块',
            //                 icon: 'setting',
            //                 url: 'Other/Dynamic'
            //             }
            //         ]
            //     }
            // ]
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
            if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))){
                this.$router.push(item.path);
            }
            this.$store.commit('selectMenu', item)
        }

    },

    computed:{
        //用来仅显示首页
        isHome(){
            return this.menuData.filter(item => item.name=='home')
        },
        //没有子菜单
        noChildren(){
            return this.menuData.filter(item => !item.children && item.name!='home')
        },
        //有子菜单
        hasChildren(){
            return this.menuData.filter(item => item.children)
        },
        menuData(){
            // 判断当前数据，如果当前没有，从当前store中去获取
            return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu

        },
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