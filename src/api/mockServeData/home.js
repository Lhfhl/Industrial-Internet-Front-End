import Mock from 'mockjs'

// 图表数据
let List = []
let rqs1plus="";
let rqs2plus="";
let rqs3plus="";
let rqs4plus="";


export default {
  
  getStatisticalData: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          Jpetstore: Mock.Random.float(100, 8000, 0, 0),
          Spring : Mock.Random.float(100, 8000, 0, 0),
          Cargo: Mock.Random.float(100, 8000, 0, 0),
          Face: Mock.Random.float(100, 8000, 0, 0),
          Microservice: Mock.Random.float(100, 8000, 0, 0),
          PLC: Mock.Random.float(100, 8000, 0, 0)
        })
      )
    }
    return {
      code: 20000,
      data: {
       
       
      }
    }
  },
  getPipeline :data=>{
const {order1,order2,order3,order4} =JSON.parse(data.body);
console.log(JSON.parse(data.body))
rqs1plus=order1+"1";
rqs2plus=order2+"1";
rqs3plus=order3+"1";
rqs4plus=order4+"1";

    return {
      code: 20000,
      data: [rqs1plus,rqs2plus,rqs3plus,rqs4plus
      ]
      
      }
  }





}
