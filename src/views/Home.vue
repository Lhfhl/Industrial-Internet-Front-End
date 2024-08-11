<template>
  <div>
   
    <el-row>
      <el-col :span="11" style="padding-right: 20px">
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/images/Super.png" alt="" />
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">使用者</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录的时间：<span>2023-6-1</span></p>
            <p>上次登录的地点：<span>北京</span></p>
          </div>
        </el-card>
        <!-- <div style="background-image: url('D:\大融合项目\前端\my-app\src\assets\images\pic1.png');">
          <img src="/login-bg.png"></div> -->
      </el-col>

      <el-col :span="13" style="padding-right: 10px;">
        
             <!-- 是说这里的走马灯展示图片要换成视频流，如果要换具体就把这个col的部分换掉吧， -->
        <el-card
          style="
            height: 350px;
            background-color: rgb(208, 227, 244);
          ">

             <div class="block">
            <h3 style="color:brown;margin-left:300px">车间预览</h3>
            <el-carousel trigger="click" height="300px">
              <el-carousel-item v-for="item in exhibiton" :key="item.num">
                
                <el-image style="margin:10px;width: 800px;height: 300px;" src="https://fc1tn.baidu.com/it/u=4251556564,2821579416&fm=203&mola=new&crop=v1"></el-image>
              <!-- 由于没有图片，这里用的网图，后面有图片了换上去也行，而且四张图都一模一样，就统一写了 -->
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-card>
      </el-col>
      
    </el-row>

    <el-col :span="24" style="margin-top:20px">
        <div class="rqsform">
          <el-form ref="form" :model="form" :inline="true">
            <h3
              style="margin-bottom: 10px; margin-left: 520px; margin-top: 20px;color:brown">
              柔性产线定制
            </h3>
            
            <div class="grid-container">
              <el-form-item
                class="pullform"
                v-for="(someLine, index) in form.lineType" 
                :label="someLine.label"
                :key="index">

                <el-select placeholder="请选择" v-model="someLine.lineChosen">
                  <el-option
                    v-for="item in LineModel"
                    :value="item.process"
                    :label="item.label"
                    :key="item.process"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>

          </el-form>
          <div class="button-container">
            <el-button type="primary" round @click="submit">生成您的定制</el-button>
          </div>
        </div>
      
      </el-col>
    
    <el-col :span="24">
      <div class="demo-image">
        <h3 style="text-align: center; margin-bottom: 20px; color: brown">
          产线预览
        </h3>
      
        <img class="direction" src="../../public/images/direction.png"></img>
        <div class="line">
          <span class="typetext"
            v-for="(item, index) in pipeline"
            :key="index"
            v-if="item.seen"
            style="white-space: nowrap;color:chocolate;text-align: center;">
            {{ item.class}}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        </span>
        <span class="typetext"
            v-for="(item, index) in pipeline"
            :key="index"
            v-if="item.seen"
            style="white-space: nowrap;">
            {{ item.process }}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        </span>
        </div>
        <div class="line">
          <span
            class="demonstration"
            v-for="(item, index) in pipeline"
            :key="index"
            v-if="item.seen">
            <el-image class="pipelineimg" :src="item.url"></el-image>
          </span>
        </div>

        <span class="confirmButton">
          <el-button round v-if="isReconfirm" @click="open">生成订单</el-button>
        </span>
      </div>
    </el-col>
  </div>
</template>
<script>
import { getData } from "../api";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  components: {
    FontAwesomeIcon
  },
  data() {

    //return部分都是字典，用于存放本界面的所有数据结构
    return {
      form: {
        lineType: [
          //提交列表后改变此处的值，lineChosen用于submit中对LineModel进行匹配
          { lineChosen: "", label: "选项1" },
          { lineChosen: "", label: "选项2" },
          { lineChosen: "", label: "选项3" },
          { lineChosen: "", label: "选项4" },
          { lineChosen: "", label: "选项5" },
          { lineChosen: "", label: "选项6" },
          { lineChosen: "", label: "选项7" },
          { lineChosen: "", label: "选项8" },
          { lineChosen: "", label: "选项9" },
          { lineChosen: "", label: "选项10" },
        ],
      },
      // 流水线,这里的pipeline会随着用户的提交生成定制按钮后发生改变，具体见setpipeline()和submit()
      //这里的url也是随便找的网图，如果有合适的图片直接改url就行，例如// url:"../../images/test2.png",
      pipeline: [{
          class:"铣床",
          process: "路径参数设置",
         url: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3535650726,1744382531&fm=199&app=68&f=JPEG?w=750&h=750&s=B291356064A682BE9AA928160100D0E2",
          seen: "true",
        },
        {class:"料库",
          process: "订单出库",
          url: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1925937780,3311737653&fm=199&app=68&f=JPEG?w=750&h=750&s=3D8870334E377388CEC814C70100A0A0",
          seen: "true",
        },
        {class:"料库",
          process: "料库  >>>  铣床",
          url: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2565862764,3139638590&fm=199&app=68&f=JPEG?w=640&h=640&s=02B0632266C7B3AFFA18C1B6010050E2",
          seen: "true",
        },
        {class:"铣床",
          process: "铣床加工",
          url: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3900055160,970367034&fm=199&app=68&f=JPEG?w=640&h=640&s=11B8EC3044E667ABEF311DC70100E0E1",
          seen: "true",
        },
        {class:"铣床",
          process: "铣床>>>车床",
          url: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2252806894,2420454989&fm=199&app=68&f=JPEG?w=640&h=640&s=479AE52208B74FA91B3989D7010080E2",
          seen: "true",
        },
        {class:"车床",
          process: "车床加工",
          url: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2565862764,3139638590&fm=199&app=68&f=JPEG?w=640&h=640&s=02B0632266C7B3AFFA18C1B6010050E2",
          seen: "true",
        },
        {class:"车床",
          process: "车床>>>检测",
          url: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1925937780,3311737653&fm=199&app=68&f=JPEG?w=750&h=750&s=3D8870334E377388CEC814C70100A0A0",
          seen: "true",
        },
        {class:"检测",
          process: "视觉检测",
          url: "https://jmy-pic.baidu.com/0/pic/-1105111569_1549761291_1684186752.png",
          seen: "true",
        },
        {class:"组装",
          process: "组装",
          url: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3900055160,970367034&fm=199&app=68&f=JPEG?w=640&h=640&s=11B8EC3044E667ABEF311DC70100E0E1",
          seen: "true",
        },
        {class:"铣床",
          process: "入库",
          url: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3535650726,1744382531&fm=199&app=68&f=JPEG?w=750&h=750&s=B291356064A682BE9AA928160100D0E2",
          seen: "true",
        },
     
    ],
//产线预览模板，初始情况下图片用的LineModel的数据，LineModel和pipeline的区别就是它是初始化用的，不会发生改变
      LineModel: [
        
        {
          class:"铣床",
          process: "路径参数设置",
        
          url: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3535650726,1744382531&fm=199&app=68&f=JPEG?w=750&h=750&s=B291356064A682BE9AA928160100D0E2",
          seen: "true",
        },
        {class:"料库",
          process: "订单出库",
          url: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1925937780,3311737653&fm=199&app=68&f=JPEG?w=750&h=750&s=3D8870334E377388CEC814C70100A0A0",
          seen: "true",
        },
        {class:"料库",
          process: "料库>>>铣床",
          url: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2565862764,3139638590&fm=199&app=68&f=JPEG?w=640&h=640&s=02B0632266C7B3AFFA18C1B6010050E2",
          seen: "true",
        },
        {class:"铣床",
          process: "铣床加工",
          url: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3900055160,970367034&fm=199&app=68&f=JPEG?w=640&h=640&s=11B8EC3044E667ABEF311DC70100E0E1",
          seen: "true",
        },
        {class:"铣床",
          process: "铣床>>>车床",
          url: "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2252806894,2420454989&fm=199&app=68&f=JPEG?w=640&h=640&s=479AE52208B74FA91B3989D7010080E2",
          seen: "true",
        },
        {class:"车床",
          process: "车床加工",
          url: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2565862764,3139638590&fm=199&app=68&f=JPEG?w=640&h=640&s=02B0632266C7B3AFFA18C1B6010050E2",
          seen: "true",
        },
        {class:"车床",
          process: "车床>>>检测",
          url: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1925937780,3311737653&fm=199&app=68&f=JPEG?w=750&h=750&s=3D8870334E377388CEC814C70100A0A0",
          seen: "true",
        },
        {class:"检测",
          process: "视觉检测",
          url: "https://jmy-pic.baidu.com/0/pic/-1105111569_1549761291_1684186752.png",
          seen: "true",
        },
        {class:"组装",
          process: "组装",
          url: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3900055160,970367034&fm=199&app=68&f=JPEG?w=640&h=640&s=11B8EC3044E667ABEF311DC70100E0E1",
          seen: "true",
        },
        {class:"铣床",
          process: "入库",
          url: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3535650726,1744382531&fm=199&app=68&f=JPEG?w=750&h=750&s=B291356064A682BE9AA928160100D0E2",
          seen: "true",
        },
      ],
      //走马灯的部分数据，后面走马灯貌似要删除掉，这里是为了创建四个走马灯
      exhibiton: [
        {
          num: 1,
          name: "test1",
          src: "",
        },
        {
          num: 2,
          name: "test2",
          src: null,
        },
        {
          num: 3,
          name: "test3",
          src: null,
        },
        {
          num: 4,
          name: "test4",
          src: null,
        },
      ],

      modalType: 0,
      isReconfirm: false,
      isAllOption: 0, //所有选项均被选取
    };
  },

  methods: {
    open() {
      this.$confirm("确定订单？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          this.isReconfirm = !this.isReconfirm;
          //这里写入提交数据流程
          //
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作",
          });
          this.isReconfirm = !this.isRem;
        });
    },
    submit() {
      //  按下选项按钮的方法，并非提交数据到后端的方法，暂时是个空壳
      let valid = true;
      this.form.lineType.forEach((item) => {
        if (!item.lineChosen) {
          valid = false;
          this.isAllOption = 1;
          console.log(valid, "valid");
        }
      });
      if (valid) {
        //如果要提交订单到后端，在这里写入代码，
        for (let index = 0; index < this.LineModel.length; index++) {
          const lineChosen = this.form.lineType[index].lineChosen;
          const lineSet = this.setPipeline(lineChosen);
          this.pipeline[index].process = lineSet.process;
          this.pipeline[index].url = lineSet.url;
          this.pipeline[index].seen = lineSet.seen;
        }
        // this.$refs.form.
        this.isReconfirm = !this.isReconfirm;
      } else {
        this.$message.error("请确保所有选项都已选择。");
      }
    },
    setPipeline(linename) {
      //提供下方车间顺序的预览情况
      let findLine = {
        process: "",
        url: "",
        seen: "true",
      };
      for (let item of this.LineModel) {
        if (linename == item.process) {
          findLine = item;
          break;
        }
      }
      return findLine;
    },

    hasNextItem(index) {
      // 流水线判断是否有下一项
      return index < this.pipeline.length - 1;
    },
    outputPipelineName(pipeline) {
      if (Array.isArray(pipeline)) {
        const processedArray = pipeline.map((item) => item.process).join(" ");
        return processedArray;
      } else {
        return "";
      }
    },
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      this.tableData = tableData;
    });
  },
};
</script>
<style lang="less" scoped>
.line {
  display: grid;
  grid-template-rows: auto auto; /* 新增这一行 */
  grid-template-columns: auto auto auto auto auto auto auto auto auto auto;
  grid-gap: 5px;
}

.demo-image {
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 30px;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: rgb(208, 227, 244);
  opacity: 0.9;
}

.demonstration {
  padding: 1px;
  width: 100px;
  margin-right: 2px;
  float: left;
}
.typetext {
  padding: 1px;
  width: 80px;
  margin-right: 0px;
  float: left;
}


.pipelineimg {
  width: 80px;
  height: 100px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.user {
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;


  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999999;
      margin-bottom: 10px;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;

    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}



.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 15px;
  margin: 0;

  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.bussinesState {
  height: 280px;
  opacity: 0.95;
  background-color: rgb(208, 227, 244);
  opacity: 0.9;
}

.box-card {
  background-color: rgb(208, 227, 244);
  opacity: 0.9;
}

.confirmButton {
  padding-left: 505px;
}
.pullform {
  margin-left: 30px;
  margin-top: 20px;
  // display: grid;
  grid-template-rows: auto auto; 
  grid-template-columns: auto auto auto auto auto auto ;
  // grid-gap: 5px;
}
.rqsform {
  height: auto;
  margin-top: 10px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: rgb(208, 227, 244);
  opacity: 0.9;
}
.grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 10px;
  }
  .button-container {
    text-align: center;
    margin-top: 20px;
    padding-left: 600px
  }
 .direction{
width:100%;
  height:50px;
  opacity:0.6;


 }
</style>
