<template>
  <div>
    <el-row :gutter="40">
      <el-col :span="3" :offset="1">
        <el-card>
          <el-statistic 
            :precision="2"
            :value="Indoor_relative_humidity"
            title="室内相对湿度"
            suffix="%"
            class="statistic"
          >
          </el-statistic>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card>
          <el-statistic 
            :precision="2"
            :value="Outdoor_relative_humidity"
            title="室外相对湿度"
            suffix="%"
          >
          </el-statistic>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card>
          <el-statistic 
            :precision="2"
            :value="Sun_light_in_east"
            title="东立面的阳光"
            suffix="lux"
          >
          </el-statistic>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card>
          <el-statistic 
            :precision="2"
            :value="Sun_light_in_west"
            title="西立面的阳光"
            suffix="lux"
          >
          </el-statistic>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card>
          <el-statistic 
            :precision="2"
            :value="Sun_irradiance"
            title="太阳辐照度"
          >
          <template #suffix>
            W/m<sup>2</sup>
          </template>
          </el-statistic>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card>
          <el-statistic 
            :precision="2"
            :value="Wind_speed"
            title="风速"
            suffix="m/s"
          >
          </el-statistic>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card>
          <el-statistic 
            :precision="2"
            :value="Rainfall_ratio"
            title="降雨比例"
          >
          </el-statistic>
          <div style="color: #999;text-align: center;margin-top: 5px;">最近15分钟</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;" :gutter="30" >
      <el-col :offset="1" :span="10">
        <el-card style="height: auto; display: flex; flex-direction: column; align-items: center;">
          <!-- 标题部分 -->
          <div style="font-size: 24px; text-align: center; margin-bottom: 10px;">
            <h3>安全头盔检测</h3>
          </div>
          <!-- 图片部分 -->
          <el-image
            :src="safety_helmet_identification_url"
            fit="contain"
          />
        </el-card>
      </el-col>
      <el-col :span="11">
        <el-card class="card-DynamincChart">
          <!-- 标题部分 -->
          <div style="font-size: 24px; text-align: center;">
            <h3>温度预警</h3>
          </div>
          <DynamicChart class="DynamincChart"></DynamicChart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
  
<script>
import axios from 'axios';
import DynamicChart from '../components/chart/DynamicChart.vue';

export default {
  components: {
    DynamicChart,
  },
  data() {
    return {
      /**
       * 七个指标
       */
      Indoor_relative_humidity: 0,  //室内相对湿度，%
      Outdoor_relative_humidity: 0, //室外相对湿度，%
      Sun_light_in_east: 0, //东立面的阳光，lux
      Sun_light_in_west: 0, //西立面的阳光，lux
      Sun_irradiance: 0,    //太阳辐照度，单位 W/m2
      Wind_speed: 0,        //风速，m/s
      Rainfall_ratio: 0,     //降雨比例
      /**
       * 安全头盔识别
       */
      safety_helmet_identification_url: '',
      intervalId: null, // 七个指标定时器 ID
      intervalIdHelmet: null  //安全头盔定时器ID
    };
  },
  created() {
    // 从后端获取数据
    this.fetchMetric();
    // 每5分钟刷新一次数据
    this.intervalId = setInterval(this.fetchMetric, 300000);
    // 每5分钟刷新一次头盔图片
    this.fetchHelmetImage();
    this.intervalIdHelmet = setInterval(this.fetchHelmetImage, 300000);
  },
  beforeDestroy() {
    // 组件销毁时清除定时器
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.intervalIdHelmet) {
      clearInterval(this.intervalIdHelmet);
    }
  },
  methods: {
    /**
     * 
     * 获取七个指标
     * 
     */
    async fetchMetric() {
      try {
        const response = await axios.get('/schedulerfront/index');
        const data = response.data;

        this.Indoor_relative_humidity = Number(parseFloat(data.Relative_humidity_room).toFixed(2));
        this.Outdoor_relative_humidity = Number(parseFloat(data.Outdoor_relative_humidity_Sensor).toFixed(2));
        this.Sun_light_in_east = Number(parseFloat(data.Meteo_Sun_light_in_east_facade).toFixed(2));
        this.Sun_light_in_west = Number(parseFloat(data.Meteo_Sun_light_in_west_facade).toFixed(2));
        this.Sun_irradiance = Number(parseFloat(data.Meteo_Sun_irradiance).toFixed(2));
        this.Wind_speed = Number(parseFloat(data.Meteo_Wind).toFixed(2));
        this.Rainfall_ratio = Number(parseFloat(data.Meteo_Rain).toFixed(2));
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    },
    /**
     * 
     *安全头盔识别
     * 
     */
    fetchHelmetImage() {
      // console.log("我刷新了一次")
      this.safety_helmet_identification_url = `/schedulerfront/helmet`;
    }
  },
};
</script>

  
<style scoped>
.metric-card {
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.metric-content {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.metric-unit {
  font-size: 16px;
  color: #666;
  margin-left: 5px;
}

::v-deep .el-card {
  height: 150px;
}
::v-deep .el-statistic .con .number {
  font-size: 40px; /* 进一步放大值的字体 */
}

::v-deep .el-statistic .head {
  font-size: 30px; /* 放大标题的字体 */
  margin-bottom: 15px;
}

::v-deep .el-statistic .con span {
  font-size: 30px; /* 放大单位的字体 */
}

.card-DynamincChart{
  width: 100%;
  height: 515px;
}

.DynamincChart{
  margin-top: 100px;
}
</style>

  