<template>
    <div>
        <h1>微服务候选者提取模块</h1>

        <el-col :span="12">
            <el-row class="button1">
                <el-upload>
                    <el-button>选择</el-button>
                    <el-button type="primary">自动检索</el-button>
                </el-upload>


            </el-row>

            <el-input v-model="form.input" placeholder="请输入待分析遗留程序的程序特征矩阵文件路径" size="mini"></el-input>

            <el-input v-model="form.num" placeholder="请输入期望的微服务候选者数量" size="mini"></el-input>

            <el-row class="button2">
                <el-button type="danger" @click="open">微服务候选者提取</el-button>
            </el-row>

            <el-row>
                <h1 style="margin-top: 25px;">提取结果可视化</h1>
                <el-button type="success">可视化</el-button>
            </el-row>


            <img style="scale: 75%;" src="../assets/images/visual.png" alt="">


        </el-col>

        <el-col :span="12">
            <h1>中间件提取模块</h1>

            <el-upload>
                <el-button type="primary" style="margin-bottom: 20px;">选择中间件</el-button>
            </el-upload>

            <el-input v-model="form.sth" placeholder="" size="mini"></el-input>

            <el-row>
                <el-button type="danger" @click="storage">存储至本地</el-button>
            </el-row>

            <el-row>
                <h1 style="margin-top: 25px;">与baseline进行指标对比</h1>
                <el-button style="margin-bottom: -50px;" type="success">箱线图可视化</el-button>
            </el-row>

            <img style="scale: 75%;" src="../assets/images/plotfigure.png" alt="">


        </el-col>

    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                input: '',
                num: '',
                sth: ''
            },
            fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],

        }
    },
    methods: {
        open() {
            this.$alert('微服务候选者提取操作完成', '操作提示', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: `action: ${action}`
                    });
                }
            });
        },
        storage() {
            this.$alert('中间件输出至本地操作完成', '操作提示', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: `action: ${action}`
                    });
                }
            });
        },
    }
}
</script>
</script>
<style lang="less" scoped>
.el-input {
    width: 500px;
    margin-bottom: 20px;
}

.button1 {
    margin-bottom: 20px;
}
</style>
