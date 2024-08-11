<template>
    <div class="embed-container">
      <iframe
      ref="grafanaIframe"
      width="100%"
      height="600"
      :src="grafanaUrl"
      frameborder="0"
      allowfullscreen
      :headers="this.headers" 
    ></iframe>>
    </div>
  </template>
  <script>
  // 获取 iframe 元素
  import axios from 'axios';
  export default {
    data() {
      return {
        grafanaUrl: 'http://10.112.184.214:32000/',
        headers: {
        Authorization: 'Bearer eyJrIjoiMW5BSHB2bTJ4bkFOUjZTelRhZnAyejdsNjVsZllvMGYiLCJuIjoiY2Nza2V5MiIsImlkIjoxfQ==',
      },
      };
    },
    mounted() {

    },
    methods: {
   
    }
  };
  </script>
  <style lang="less" scoped>
  .proctitle {
    text-align: center;
  }
  
  .circleproc {
    margin: auto;
  }
  
  .grid-content {
    border-radius: 4px;
    height: auto;
    margin: auto;
    justify-content: center;
    align-items: center;
  }
  
  .bg-lightyellow {
    background-color: white;
  }
  
  .toph {
    h3 {
      text-align: center;
      height: 50px;
    }
  }
  
  .innertitle {
    text-align: center;
    color: goldenrod;
    height: 30px;
    padding-top: 10px;
  }
  .iframe {
    width: 100%; /* 横向铺满容器 */
    border: none; /* 去除iframe的边框 */
    height:1000px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .embed-container {
    width: 100%; /* 横向铺满父容器 */
    height: 100%; /* 高度与父容器相同 */
    overflow: hidden; /* 隐藏溢出部分 */
    position: relative;
  }
  </style>