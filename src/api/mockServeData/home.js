import Mock from 'mockjs'

// 图表数据
let List = []
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
        // 饼图
        videoData: [
          {
            name: 'PLC-Controller',
            value: 2999
          },
          {
            name: 'Jpetstore',
            value: 5999
          },
          {
            name: 'Spring-Petclinic',
            value: 1500
          },
          {
            name: 'Cargo-Driven',
            value: 1999
          },
          {
            name: 'Face-Recognizition',
            value: 2200
          },
          {
            name: 'Microservice-Extraction-Background',
            value: 4500
          }
        ],
        // 柱状图
        userData: [
          {
            date: '周一',
            new: 5,
            active: 200
          },
          {
            date: '周二',
            new: 10,
            active: 500
          },
          {
            date: '周三',
            new: 12,
            active: 550
          },
          {
            date: '周四',
            new: 60,
            active: 800
          },
          {
            date: '周五',
            new: 65,
            active: 550
          },
          {
            date: '周六',
            new: 53,
            active: 770
          },
          {
            date: '周日',
            new: 33,
            active: 170
          }
        ],
        // 折线图
        orderData: {
          date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
          data: List
        },
        tableData: [
          {
              name: 'Jpetstore',
              artifactNumber: 24,
              code: 2456,
              language: 'Java'
          },
          {
              name: 'Spring-Petclinic',
              artifactNumber: 14,
              code: 956,
              language: 'Java'
          },
          {
              name: 'Cargo-Driven',
              artifactNumber: 14,
              code: 956,
              language: 'Java'
          },
          {
              name: 'Face-Recognizition',
              artifactNumber: 3,
              code: 324,
              language: 'Python'
          },
          {
              name: 'Microservice-Extraction-Background',
              artifactNumber: 25,
              code: 2670,
              language: 'Java'
          },
          {
              name: 'PLC-Controller',
              artifactNumber: 145,
              code: 9432,
              language: 'C++'
          }
        ]
      }
    }
  }
}
