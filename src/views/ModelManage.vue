<template>
    <div>
      <h2 style="font-size: 1.6em;">模型列表</h2>
      <!-- 按钮区域 -->
      <div class="button-group">
        <button class="btn" @click="resetProductionLine" style="font-size: 1.6em;">产线复位</button>
        <button class="btn" @click="stopResetProductionLine" style="font-size: 1.6em;">停止产线复位</button>
      </div>
      <!-- 模型展示区域 -->
      <table v-if="showTable">
        <thead>
          <tr>
            <th style="font-size: 1.6em;">ID</th>
            <th style="font-size: 1.6em;">模型名称</th>
            <th style="font-size: 1.6em;">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="model in models" :key="model.id">
            <td style="font-size: 1.6em;">{{ model.id }}</td>
            <td style="font-size: 1.6em;">{{ model.name }}</td>
            <td>
              <button class="btn" @click="viewModel(model.id)" style="font-size: 1.6em;">查看模型详情</button>
              <button class="btn" @click="startProduction(model.id)" style="font-size: 1.6em;">开始生产</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 弹窗 -->
      <div>
      <Dialog :visible="isModalVisible">
        <!-- 弹窗内容 -->
        <div class="model-info">
        <h2>模型详情</h2>
        <!-- 基本信息 -->
        <div class="basic-info info-block">
          <h3>基本信息</h3>
          <div class="info-item">
            <span class="label">ID:</span>
            <span class="value">{{ modelInfo.id }}</span>
          </div>
          <div class="info-item">
            <span class="label">模型名称:</span>
            <span class="value">{{ modelInfo.name }}</span>
          </div>
          <div class="info-item">
          <span class="label">模型状态:</span>
          <span class="value" v-if="modelInfo.status === 1">
              可生产
          </span>
          <span class="value" v-else-if="modelInfo.status === 0">
              停产
          </span>
          <span class="value" v-else>
              未知状态
          </span>
          </div>
        </div>
        
        <!-- 分割线 -->
        <hr class="divider" />

        <!-- 模型生产线 -->
        <div class="production-line info-block">
          <h3>模型生产线</h3>
          <div v-for="(step, index) in lineDetail" :key="index" class="info-item">
          <span class="step-number">{{ index + 1 }}</span>
          <span class="value">{{ step }}</span>
        </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="close-button" @click="hideModal">关闭</button>
      </div>
      </Dialog>
    </div>
    </div>
</template>

<script>
  import Dialog from '../components/DiaLog.vue';
  const axios = require('axios');
  export default {
    data() {
      return {
        //“模型”数据
        showTable: false,
        models : [],  //全部模型信息
        modelInfo: {}, // 初始化模型信息对象
        //“弹窗”数据
        isModalVisible: false, // 控制弹窗显示隐藏的变量
        lineDetail: [],
      };
    },
    components: {
      Dialog // 注册弹窗组件
    },
    created() {
      this.fetchModels();
    },
    methods: {
        async fetchModels() {   //获取全部模型信息
          try {
            const response = await axios.get('/api/admin/model/getAll');
            response.data.data.forEach(model => {
              this.models.push(model);
            });
            this.showTable = true; // 设置条件为true，显示table
          } catch (error) {
            console.error('获取模型列表失败', error);
            // 添加失败提示，例如使用 Element UI 的 Message 组件
            this.$message.error('获取模型列表失败，请稍后重试');
          }
        },
        
        async viewModel(id) {   //查看模型详情
        try {
          const url = `/api/admin/model/getById?id=${id}`;
          const response = await axios.get(url);
          this.modelInfo = response.data.data; // 将获取到的数据保存到组件数据中
          //分割产线字符串
          this.lineDetail = this.splitLineDetails();
          // 调用Dialog函数打开弹窗
          // this.isModalVisible = true; // 显示弹窗
          // 导航到模型信息页面，并传递模型id，未使用，改为使用弹窗展示
          this.$router.push({ name: 'modeldetail', query:{ id } });
        } catch (error) {
            console.error('获取模型信息失败', error);
            // 添加失败提示，例如使用 Element UI 的 Message 组件
            this.$message.error('获取模型信息失败，请稍后重试');
        }
        },
        hideModal() {
          this.isModalVisible = false; // 隐藏弹窗
        },

        async startProduction(id) {
            try {
              // 发起请求开始生产
              await axios.get(`/api/admin/order/order/${id}`);
              console.log('开始生产成功');
              // 添加成功提示，例如使用 Element UI 的 Message 组件
              this.$message.success('开始生产成功');
              // 导航到订单管理页面
              this.$router.push({ name: 'ordermanage' });
            } catch (error) {
              console.error('开始生产失败', error);
              // 添加失败提示，例如使用 Element UI 的 Message 组件
              this.$message.error('开始生产失败，请稍后重试');
            }
        },
        
        async resetProductionLine() {
        try {
            // 发起请求产线复位
            await axios.get('/api/admin/line/reset');
            console.log('产线复位成功');
            // 添加成功提示，例如使用 Element UI 的 Message 组件
            this.$message.success('产线复位成功');
          } catch (error) {
            console.error('产线复位失败', error);
            // 添加失败提示，例如使用 Element UI 的 Message 组件
            this.$message.error('产线复位失败，请稍后重试');
          }
        },

        async stopResetProductionLine() {
          try {
              // 发起请求停止产线复位
              await axios.get('/api/admin/line/stopReset');
              console.log('停止产线复位成功');
              // 添加成功提示，例如使用 Element UI 的 Message 组件
              this.$message.success('停止产线复位成功');
            } catch (error) {
              console.error('停止产线复位失败', error);
              // 添加失败提示，例如使用 Element UI 的 Message 组件
              this.$message.error('停止产线复位失败，请稍后重试');
            }
        },
        //“分割产线”函数
        splitLineDetails() {
          // 检查 modelInfo.lineDetails 是否存在，如果不存在返回空数组
          if (!this.modelInfo.lineDetails) return [];
          
          // 使用逗号分割 lineDetails，并返回分割后的数组
          return this.modelInfo.lineDetails.split(',');
        },
    }
  };
</script>
  
<style scoped>
  .container {
    padding: 20px;
    background-color: #ffffff; /* 设置背景颜色为纯白色 */
    border-radius: 8px; /* 添加圆角边框 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    padding: 10px;
    text-align: center; /* 居中对齐 */
    border-right: 1px solid #e0e0e0; /* 设置每一列的竖直分割线 */
    border-bottom: 1px solid #e0e0e0; /* 设置每一行的水平分割线 */
  }
  
  th:first-child, td:first-child {
    border-left: 1px solid #e0e0e0; /* 设置第一列的竖直分割线 */
  }
  
  th {
    background-color: #f5f5f5; /* 设置表头背景颜色为浅灰色 */
  }
  
  .btn {
    padding: 6px 12px;
    border: none;
    background-color: #007bff; /* 设置按钮背景颜色为蓝色 */
    color: #ffffff; /* 设置按钮文字颜色为白色 */
    border-radius: 4px; /* 添加圆角边框 */
    cursor: pointer;
    transition: background-color 0.3s ease; /* 添加过渡效果 */
    flex: 1; /* 使按钮占据等分的宽度 */
    margin: 0 30px; /* 设置按钮的外边距为 10px */
  }
  
  .btn:hover {
    background-color: #0056b3; /* 鼠标悬停时按钮背景颜色变深 */
  }

.btn:first-child {
  margin-left: 0; /* 第一个按钮左边距为 0 */
}

.btn:last-child {
  margin-right: 0; /* 最后一个按钮右边距为 0 */
}

.modal-footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.close-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #0056b3;
}

/* 调整每行文字间距 */
.info-item {
  line-height: 1.5; /* 设置行高为1.5倍文字大小 */
}

.step-number {
  /* 添加边缘线样式 */
  border: 0.7px solid black; /* 边缘线样式：2px的黑色实线 */
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #ffffff; /* 背景色 */
  color: #000000; /* 文字颜色 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px; /* 调整与文字之间的间距 */
}
</style>