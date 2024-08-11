<template>
  <div class="form-container" >
    <h2>云边资源容器调度</h2>
    <div class="tabs">
        <button :class="{ active: activeTab === 'basic' }" @click="activeTab = 'basic'">基本信息</button>
        <button :class="{ active: activeTab === 'config' }" @click="activeTab = 'config'">容器配置</button>
    </div>
    <!-- 基本信息页面 -->
    <el-form v-if="activeTab === 'basic'" class="form-section" :rules="rules1" :model="form" label-width="auto" >
      <el-form-item label="部署名称：" prop="deployname" class="input_label">
        <el-input placeholder="deploy-name" v-model="form.deployname" class="input_content"></el-input>
      </el-form-item>
      <el-form-item label="命名空间：" prop="namespace" class="input_label">
        <el-input placeholder="default" v-model="form.namespace" class="input_content"></el-input>
      </el-form-item>
      <el-form-item label="副本数：" prop="replicas" class="input_label">
        <el-input placeholder="1" v-model="form.replicas" class="input_content"></el-input>
      </el-form-item>
      <el-form-item label="调度器：" prop="scheduler">
        <el-select v-model="form.scheduler" placeholder="请选择" :teleported="false">
          <el-option label="k8s-default" :value="1"></el-option>
          <el-option label="edge-sceduler" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="云边调度：" prop="scheduler_positon">
        <el-select v-model="form.scheduler_positon" placeholder="请选择" >
          <el-option label="边端" :value="1"></el-option>
          <el-option label="云端" :value="0"></el-option>
          <el-option label="任意" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <!-- 添加注释 -->
      <el-form-item>
        <p>* 请点击上方选项继续填写“容器配置”</p>
      </el-form-item>
    </el-form>

    <!-- 容器配置页面 -->
    <el-form v-if="activeTab === 'config'" class="form-section" :rules="rules2" label-width="auto" :model="form">
      <el-form-item label="容器名称：" prop="container_name">
        <el-input placeholder="containerid-01" v-model="form.container_name" class="input_content"></el-input>
      </el-form-item>
      <el-form-item label="镜像名称：" prop="image_name">
        <el-input placeholder="" v-model="form.image_name" class="input_content"></el-input>
      </el-form-item>
      <el-form-item label="镜像版本：" prop="image_version">
        <el-input placeholder="latest" v-model="form.image_version" class="input_content"></el-input>
      </el-form-item>
      <!-- 容器 "CPU" 需求和限制 -->
      <div class="flex-container">
        <el-form-item label="cpu需求：" prop="cpu_request" class="flex-item">
          <el-input placeholder="200m" v-model="form.cpu_request" class="inputform"></el-input>
        </el-form-item>
        <el-form-item label="cpu限制：" prop="cpu_limit" class="flex-item">
          <el-input placeholder="200m" v-model="form.cpu_limit" class="inputform"></el-input>
        </el-form-item>
      </div>
      <!-- 容器 "内存" 需求和限制 -->
      <div class="flex-container">
        <el-form-item label="mem需求：" prop="mem_request" class="flex-item">
          <el-input placeholder="200Mi" v-model="form.mem_request" class="inputform"></el-input>
        </el-form-item>
        <el-form-item label="mem限制：" prop="mem_limit" class="flex-item">
          <el-input placeholder="200Mi" v-model="form.mem_limit" class="inputform"></el-input>
        </el-form-item>
      </div>
      <!-- 选择是否需要GPU -->
      <el-form-item label="使用gpu资源：" prop="use_gpu">
        <el-select v-model="form.use_gpu" placeholder="请选择">
          <el-option label="true" :value="1"></el-option>
          <el-option label="false" :value="0"></el-option>
          <el-option label="any" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <!-- 如果需要，则GPU需求和限制 -->
      <div class="flex-container">
        <el-form-item v-if="form.use_gpu" label="gpu需求：" prop="gpu_request" class="flex-item">
          <el-input placeholder="2000m" v-model="form.gpu_request" class="inputform"></el-input>
        </el-form-item>
        <el-form-item v-if="form.use_gpu" label="gpu限制：" prop="gpu_limit" class="flex-item">
          <el-input placeholder="2000m" v-model="form.gpu_limit" class="inputform"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <!-- 创建容器的按钮 -->
    <div v-if="activeTab === 'config'">
      <el-button type="primary" @click="handleSubmit">创 建</el-button>
      <!-- <el-button @click="cancel">重 置</el-button> -->
    </div>
  </div>
</template>

<script>
import axios, { formToJSON } from 'axios';
export default{
  props: {
    message: String
  },
  data() {
    return {
      activeTab: 'basic',
        form: {
            deployname: 'deploy-name',
            namespace: 'default',
            replicas: '1',
            scheduler: 'k8s-default',
            scheduler_positon: null,
            use_gpu: false,
            container_name: 'containerid-01',
            image_name: '',
            image_version: 'latest',
            cpu_request: '200m',
            cpu_limit: '200m',
            mem_request: '200Mi',
            mem_limit: '200Mi',
            gpu_request: '',
            gpu_limit: ''
        },
        rules1: {
          deployname: [
            { required: true, message: '请输入部署名称', trigger: 'blur' }
          ],
          scheduler_positon: [
            { required: true, message: '请选择调度位置', trigger: 'change' }
          ]
        },
        rules2: {
          container_name: [
            { required: true, message: '请输入容器名称', trigger: 'blur' }
          ],
          image_name: [
            { required: true, message: '请输入镜像名称', trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
    async handleSubmit() {
      try {
        // 手动验证 scheduler_position 字段
        if (this.form.scheduler_positon === null || this.form.scheduler_positon === undefined) {
          this.$message.error('请选择云边调度');
          return;
        }
        const response = await axios.post('/schedulerfront/form', this.form);
        console.log('提交成功', response.data);
        this.$message.success(response.data["message"]);
        this.$refs.form.resetFields();
      } catch (error) {
        console.log("执行了catch(error)")
        console.log(error)
        this.$message.error("创建失败,reason:"+error.response.data["message"]);
        console.error('提交失败',"状态码：",error.response.status);
      }
    }
  }
}
</script>

<style scoped>
 .form-container {
    width: 60%;
    margin: 0 auto;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  h2 {
    font-size: 40px;
    text-align: center;
  }

  .tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .tabs button {
    font-size: 30px;
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
  }
  
  .tabs button.active {
    background-color: #007BFF;
    color: white;
  }

  .form-section {
    display: flex;
    flex-direction: column;
  }
  ::v-deep .el-form-item__label{
    font-weight: bold;
    font-size: 30px;
    margin-bottom: 30px;
  }
  ::v-deep .el-input__inner {
    height: 40px;
  }

  .input_content{
    font-size: 30px;
  }

  ::v-deep .el-select,::v-deep .el-input__inner{
    width: auto;
    font-size: 30px;
  }

  .el-select-dropdown__item {
    font-size: 30px;
    padding: 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 45px;
    line-height: 34px;
    box-sizing: border-box;
    cursor: pointer;
  }

  /* .el-select-dropdown__item:not(:last-child) {
  border-bottom: 1px solid #000000;
} */

.flex-container {
  display: flex;
  align-items: center;
}

.flex-item {
  flex: 1;
  margin-right: 10px;
}

.flex-item:last-child {
  margin-right: 0;
}

p {
  color: #888; /* 根据需要设置注释的颜色 */
  margin-top: 10px; /* 增加一些顶部外边距 */
  font-size: 20px;
}
</style>