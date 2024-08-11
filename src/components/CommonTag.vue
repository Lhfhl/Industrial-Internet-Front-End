<template>
    <div class="tabs">
        <el-tag
            v-for="(item, index) in tags.filter(tag => tag.name !== 'productionlinemonitoring')"
            :key="item.path"
            :closable="item.name !== 'panel'"
            :effect="$route.name === item.name ? 'dark' : 'plain'"
            @click="changeMenu(item)"
            @close="handleClose(item, index)"
            size = "large"
            >
            {{ item.label }}
        </el-tag>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default{
    name: 'CommonTag',
    data(){
        return {
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    methods: {
        ...mapMutations([ 'closeTag' ]),
        //点击tag跳转的功能
        changeMenu(item){
            // console.log(item)
            this.$router.push({ name: item.name })
        },
        // 点击tag删除的功能
        handleClose(item, index){
            // 调用store中的mutation
            this.closeTag(item) 
            // const length = this.tags.length
            const filteredTags = this.tags.filter(tag => tag.name !== 'productionlinemonitoring');
            const length = filteredTags.length;
            // 删除之后的跳转逻辑 b n
            if (item.name !== this.$route.name){
                return
            }
            // 表示是删除的最后一项
            if (index === length ) {
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            } else {
                this.$router.push({
                    name: this.tags[index].name
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.tabs{
    padding: 10px;
    border-bottom: 2px solid #C0C0C0;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
        font-size: 1.8em;
        height: 40px;
        line-height: 36px;
    }
}
</style>