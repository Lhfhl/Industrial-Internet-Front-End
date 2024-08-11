import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin')
    {
      return {
        code: 20000,
        data: {
          menu: [
            // {
            //     path: '/home',
            //     name: 'home',
            //     label: '首页',
            //     icon: 's-home',
            //     url: 'Home.vue'
            // },
            // {
            //     path: '/preprocess',
            //     name: 'preprocess',
            //     label: '日志预处理模块',
            //     icon: 'date',
            //     url: 'Preprocess.vue'
            // },
            // {
            //     path: '/extraction',
            //     name: 'extraction',
            //     label: '微服务候选者提取模块',
            //     icon: 'success',
            //     url: 'Extraction.vue'
            // },
            // {
            //     path: '/user',
            //     name: 'user',
            //     label: '用户管理',
            //     icon: 'setting',
            //     url: 'User.vue'
            // },
            // {
            //     label: '程序分析模块',
            //     icon: 'search',
            //     children: [
            //         {
            //             path: '/static',
            //             name: 'static',
            //             label: '静态分析模块',
            //             icon: 'setting',
            //             url: 'Static.vue'
            //         },
            //         {
            //             path: '/dynamic',
            //             name: 'dynamic',
            //             label: '动态分析模块',
            //             icon: 'setting',
            //             url: 'Dynamic.vue'
            //         }
            //     ]
            // }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'zhongteng' && password === 'zhongteng') {
      return {
        code: 20000,
        data: {
          menu: [
            // {
            //   path: '/home',
            //   name: 'home',
            //   label: '首页',
            //   icon: 's-home',
            //   url: 'Home.vue'
            // },
            // {
            //     path: '/user',
            //     name: 'user',
            //     label: '用户管理',
            //     icon: 'setting',
            //     url: 'User.vue'
            // }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}