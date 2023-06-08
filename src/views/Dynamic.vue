<template>
    <div>
        <h1>动态分析模块</h1>

        <el-row class="button1">
            <el-upload>
                <el-button>选择</el-button>
                <el-button type="primary">自动检索</el-button>
            </el-upload>

            
        </el-row>

        <el-input v-model="input" placeholder="请输入Jmeter线程组文件路径" size="mini"></el-input>

        <el-row class="button2">
            <el-button type="danger" @click="open">动态分析</el-button>
        </el-row>





    </div>
</template>
<script>


export default {
    data() {
        return {
            input: ''
        };
    },
    methods: {
      open() {
        this.$alert('遗留系统动态分析完成', '操作提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    }
}
</script>
<style lang="less" scoped>
.el-input {
    width: 500px;
}

.button1 {
    margin-bottom: 20px;
}

.button2 {
    margin-top: 20px;
}
</style>
