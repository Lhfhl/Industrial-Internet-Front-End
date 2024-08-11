const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,  //关闭eslint校验
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin()
    ]
    
  },
  devServer: {
    proxy: {
      '/api': {
        'target': 'http://10.112.196.200:8080',
        'changeOrigin': true,
        'pathRewrite': {
          '^/api': ''
        }
      },
      '/cloud': {
        'target': 'http://10.112.184.214:30091/api',
        'changeOrigin': true,
        'pathRewrite': {
          '^/cloud': ''
        }
      },
      '/schedulerfront': {
        'target': 'http://10.112.184.214:5000/api',
        'changeOrigin': true,
        'pathRewrite': {
          '^/schedulerfront': ''
        }
      }
    },
    client: {
      overlay: false,
    },
  }
})

