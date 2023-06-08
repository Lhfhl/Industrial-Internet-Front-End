<template>
    <div>
        <h1>程序分析日志预处理模块</h1>

        <el-row class="button1">
            <el-upload>
                <el-button>选择</el-button>
                <el-button type="primary">自动检索</el-button>
            </el-upload>


        </el-row>

        <el-input v-model="form.input" placeholder="请选择静态分析日志文件路径" size="mini"></el-input>

        <el-row class="button1">
            <el-upload>
                <el-button>选择</el-button>
                <el-button type="primary">自动检索</el-button>
            </el-upload>


        </el-row>

        <el-input v-model="form.in" placeholder="请选择动态分析日志文件路径" size="mini"></el-input>

        <el-row class="button2">
            <el-button type="danger" @click="open">日志预处理</el-button>
            <el-button type="success" @click="ope">程序特征图转换</el-button>
        </el-row>


    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                input: '',
                in: ''
            },
        }
    },
    methods: {
      open() {
        this.$alert('程序分析日志预处理操作完成', '操作提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      ope() {
        this.$alert('程序特征图转换操作完成', '操作提示', {
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
    margin-top: 20px;
    margin-bottom: 20px;
}
.button2 {
    margin-top: 20px;
}
    
</style>