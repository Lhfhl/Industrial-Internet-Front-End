<template>
    <div>
        <el-row>
            <div style="text-align: center;">
                <h3 class="titlebro">产线状态监测</h3>
            </div>
        </el-row>
        <el-row>
            <el-col :span="24" :v-if="showprocess" style="padding-top:30px;">
                <div style="background-color:rgb(208, 227, 244) ;  opacity: 0.75;">
                    <!-- 在这里设置一个v-if,后期如果接入后端，没有下订单时该界面可以用下面空白的流程界面来代替 -->
                    <h3 class="titlebro">当前进度</h3>
                    <div class="grid-container">
                        <div class="circleprocess" v-for="(item, index) in this.LineModel" :key="index">
                            <div>
                            <el-progress type="circle" :percentage="percentage(index, process_now, process_percent)"
                                :status="ciclestatus(index, process_now, process_percent)"></el-progress>
                            </div>
                                <div>{{ item.process }}</div>
                        </div>
                      
                    </div>
                </div>
            </el-col>
            <!-- <el-col :span="24" :v-if="!showprocess">
                <div style="opacity: 0.75;">
                暂时是一个空白col，然后这个是满足上面的需求的
                <div class="grid-container">
    <span class="circleprocess" v-for="(item, index) in this.LineModel" :key="index">
      <el-progress type="circle" :percentage="0"></el-progress>
    </span>
  </div>
</div>
            </el-col> -->
        </el-row>
    <el-row>
<el-col span="12" style="padding-top:30px;">
    <div style="background-color:rgb(208, 227, 244) ;text-align: center;  opacity: 0.75;">
        <h3 class="titlebro">温度监控</h3>
        <div ref="myChart_t" style="width: 100%; height: 400px;"></div>
    </div>
</el-col>

<el-col span="12" style="padding-top:30px;padding-left:20px">
    <div style="background-color:rgb(208, 227, 244) ;text-align: center;  opacity: 0.75;">
        <h3 class="titlebro">湿度监测</h3>
        <div ref="myChart_p" style="width: 100%; height: 400px;"></div>
    </div>
</el-col>
</el-row>
<el-row style="padding-top:30px">
    <div >
    <el-col :span="6">
        <div style="background-color:rgb(208, 227, 244) ;text-align: center;  opacity: 0.75;">
          <el-statistic
            group-separator=","
            :precision="2"
            :value="value1"
            :title="title1"
          >  <template slot="prefix">
              <i class="el-icon-s-flag" style="color: red"></i>
            </template></el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div style="background-color:rgb(208, 227, 244) ;text-align: center;  opacity: 0.75;">
          <el-statistic
            group-separator=","
            :precision="2"
            :value="value2"
            :title="title2"
          > <template slot="prefix">
              <i class="el-icon-s-flag" style="color: red"></i>
            </template></el-statistic>
        </div>
      </el-col>
      
      <el-col :span="6">
        <div style="background-color:rgb(208, 227, 244) ;text-align: center;  opacity: 0.75;">
          <el-statistic
            group-separator=","
            :precision="2"
            :value="value3"
            :title="title3"
          > <template slot="prefix">
              <i class="el-icon-s-flag" style="color: red"></i>
            </template></el-statistic>
        </div>

      </el-col>
      <el-col :span="6">
        <div style="background-color:rgb(208, 227, 244) ;text-align: center;  opacity: 0.75;">
          <el-statistic
            group-separator=","
            :precision="2"
            :value="value4"
            :title="title4"
          > <template slot="prefix">
              <i class="el-icon-s-flag" style="color: red"></i>
            </template></el-statistic>
        </div>
      </el-col>
    </div>
    </el-row>
    </div>
</template>
<script>
 import * as echarts from 'echarts';
export default {
    mounted() {
    this.renderChart_t();
    this.renderChart_p();
  },
    data() {
        return {
            value1:1,
            value2:2,
            value3:3,
            value4:4,
            title1:"其他数据一",
            title2:"其他数据二",
            title3:"其他数据三",
            title4:"其他数据四",
            //绘图信息，values为传感器数据
            process_now: 7,//目前产线序数，范围1-10，由后端传回
            process_percent: 30,//当前产线百分比进度
            showprocess: true,
            notshowprocess: false,
            LineModel: [
                //产线预览模板，它为上方用于预览的pipeLine提供模板数组-
                {
                    //这边暂时先用之前选择界面的LineModel暂时代替数据结构，后期还是写一个函数从api获取具体的产线信息吧，这边里面的数据结构是抄home界面的，没有意义
                    class: "铣床",
                    process: "路径参数设置",
                    url: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3535650726,1744382531&fm=199&app=68&f=JPEG?w=750&h=750&s=B291356064A682BE9AA928160100D0E2",
                    seen: "true",
                },
                {
                    class: "料库",
                    process: "订单出库",
                    url: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1925937780,3311737653&fm=199&app=68&f=JPEG?w=750&h=750&s=3D8870334E377388CEC814C70100A0A0",
                    seen: "true",
                },
                {
                    class: "料库",
                    process: "料库>>>铣床",
                    url: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2565862764,3139638590&fm=199&app=68&f=JPEG?w=640&h=640&s=02B0632266C7B3AFFA18C1B6010050E2",
                    seen: "true",
                },
                {
                    class: "铣床",
                    process: "铣床加工",
                    url: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3900055160,970367034&fm=199&app=68&f=JPEG?w=640&h=640&s=11B8EC3044E667ABEF311DC70100E0E1",
                    seen: "true",
                },
                {
                    class: "铣床",
                    process: "铣床>>>车床",
                    url: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2252806894,2420454989&fm=199&app=68&f=JPEG?w=640&h=640&s=479AE52208B74FA91B3989D7010080E2",
                    seen: "true",
                },
                {
                    class: "车床",
                    process: "车床加工",
                    url: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2565862764,3139638590&fm=199&app=68&f=JPEG?w=640&h=640&s=02B0632266C7B3AFFA18C1B6010050E2",
                    seen: "true",
                },
                {
                    class: "车床",
                    process: "车床>>>检测",
                    url: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1925937780,3311737653&fm=199&app=68&f=JPEG?w=750&h=750&s=3D8870334E377388CEC814C70100A0A0",
                    seen: "true",
                },
                {
                    class: "检测",
                    process: "视觉检测",
                    url: "https://jmy-pic.baidu.com/0/pic/-1105111569_1549761291_1684186752.png",
                    seen: "true",
                },
                {
                    class: "组装",
                    process: "组装",
                    url: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3900055160,970367034&fm=199&app=68&f=JPEG?w=640&h=640&s=11B8EC3044E667ABEF311DC70100E0E1",
                    seen: "true",
                },
                {
                    class: "铣床",
                    process: "入库",
                    url: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3535650726,1744382531&fm=199&app=68&f=JPEG?w=750&h=750&s=B291356064A682BE9AA928160100D0E2",
                    seen: "true",
                },
            ],
            chartData_t: {
        xAxis: {
          type: 'category',
          data: ['类型1', '类型2', '类型3', '类型4'],//温度类型
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [25, 30, 22, 28], // 后端传回
            type: 'bar',
          },
        ],
      },
      chartData_p: {
        xAxis: {
          type: 'category',
          data: ['类型1', '类型2', '类型3', '类型4'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [25, 30, 22, 28], // 后端传回
            type: 'bar',
          },
        ],
      },
        }
    },
    methods: {
        renderChart_t() {
      const chart = echarts.init(this.$refs.myChart_t);
      chart.setOption(this.chartData_t);
    },
    renderChart_p() {
      const chart = echarts.init(this.$refs.myChart_p);
      chart.setOption(this.chartData_p);
    },
        percentage(index, processNow, processPercent) {
            if (index < processNow) {
                return 100;
            }
            else if (index == processNow) {
                return processPercent;
            }
            else {
                return 0;
            }


        },
        ciclestatus(index, processNow, processPercent) {
            if (index < processNow) {
                return "success";
            }
            else if (index == processNow) {
                if (processPercent == 100) {
                    return "sucesss"
                }
                else { return false }
            }
            else {
                return false;
            }

        }

    }
}

</script>
<style lang="less" scoped>
.titlebro {
    color: brown;
    text-align: center;
}

.grid-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* 横向均匀分布 */
    align-items: center;
    /* 纵向居中对齐 */
    text-align: center;
}

.circleprocess {
    width: 20%;
    /* 一行五列，每个元素占 20% 宽度 */
    box-sizing: border-box;
    /* 防止元素超出宽度 */
    padding: 10px;
    /* 可选：添加内边距 */
.card{
    background-color: rgb(208, 227, 244);
  opacity: 0.9;
}
}</style>
