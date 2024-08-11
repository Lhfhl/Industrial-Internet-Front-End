<template>
    <el-form ref="form" label-width="70px" :inline="true" class="login-container" :model="form" :rules="rules">
        <h3 class="login-title">工业互联网云边端智能管控平台</h3>
        <el-form-item class="login-button-container" label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item class="login-button-container" label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <div class="login-button-container">
            <el-form-item>
            <el-button @click="submit" type="primary">登录</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>

<script>

import Cookie from 'js-cookie'
import { getMenu } from '../api'

export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, trigger: 'blur', message: '请输入用户名' }
                ],
                password: [
                    { required: true, trigger: 'blur', message: '请输入密码' }
                ]
            }
        }
    },
    methods: {
        // 登录
        submit() {
            // // token信息
            // const token = Mock.Random.guid()

            // Cookie.set('token', token)

            // 校验通过
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getMenu(this.form).then(({ data }) => {
                        console.log(data)
                        if (data.code === 20000) {
                            // token信息存入cookie，用于不同页面的通信
                            Cookie.set('token', data.data.token)
                            // 获取菜单的数据，存入store中
                            // data.data.menu
                            this.$store.commit('setMenu', data.data.menu)
                            this.$store.commit('addMenu', this.$router)
                            // 跳转到首页
                            this.$router.push('/panel')
                        } else {
                            this.$message.error(data.data.message);
                        }
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.login-container {
  width: 500px;
  margin: 180px auto;
  padding: 25px 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  color: #4e7eaf;
}

.el-input {
  width: 100%;
}

.el-button {
  width: 100%;
}

.login-button-container {
  display: flex;
  justify-content: center;
}
</style>