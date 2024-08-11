<template>
    <div class="container">
        <div style="display: flex; align-items: center;">
            <h2 style="font-size: 1.6em; margin-right: 1em;">点击查看资源详情：</h2>
            <button class="btn"  style="font-size: 1.6em;width: auto;" @click="openGrafana">Grafana</button>
        </div>
        
        <div class="load">
        <div class="cpu_load" style="width: 50%;">
            <div>
                <h2 class="h">CPU负载</h2>
            </div>
            <div style="display: flex; flex-direction: row;">
                <div class="kctd">
                    <h3 class="h" >kctd</h3>
                    <div class="chart" style="flex-direction: column; margin-top: 20px;">
                        <Cpukctd :progress="cpu_kctd"/>
                        <!-- <input type="range" v-model="progress" min="0" max="100" /> -->
                    </div>
                </div>
                <div class="t2" >
                    <h3 class="h">t2</h3>
                    <div class="chart" style="flex-direction: column; margin-top: 20px;">
                        <CpuT1 :progress="cpu_t2"/>
                        <!-- <input type="range" v-model="progress" min="0" max="100" /> -->
                    </div>
                </div>
                <div class="t3" >
                    <h3 class="h">t3</h3>
                    <div class="chart" style="flex-direction: column; margin-top: 20px;">
                        <CpuT2 :progress="cpu_t3"/>
                        <!-- <input type="range" v-model="progress" min="0" max="100" /> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="memory_load" style="width: 50%;">
            <div>
                <h2 class="h">Memory负载</h2>
            </div>
            <div style="display: flex; flex-direction: row;">
                <div class="kctd">
                    <h3 class="h">kctd</h3>
                    <div class="chart" style="flex-direction: column; margin-top: 20px;">
                        <Memorykctd :progress="memory_kctd"/>
                        <!-- <input type="range" v-model="progress" min="0" max="100" /> -->
                    </div>
                </div>
                <div class="t2">
                    <h3 class="h">t2</h3>
                    <div class="chart" style="flex-direction: column; margin-top: 20px;">
                        <MemoryT1 :progress="memory_t2"/>
                        <!-- <input type="range" v-model="progress" min="0" max="100" /> -->
                    </div>
                </div>
                <div class="t3">
                    <h3 class="h">t3</h3>
                    <div class="chart" style="flex-direction: column; margin-top: 20px;">
                        <MemoryT2 :progress="memory_t3"/>
                        <!-- <input type="range" v-model="progress" min="0" max="100" /> -->
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div class="network_disk">
        <div class="network" style="width: 50%;">
            <div>
                <h2 class="h">网络</h2>
            </div>
            <div style="display: flex; flex-direction: row;">
                <div class="downward_speed">
                    <div>
                        <h3 class="h">下行速率</h3>
                    </div>
                    <div class="downward">
                        <div class="speed_kctd">
                            <div><h3>kctd</h3></div>
                            <div class="speed-box">{{ kctdNet_downSpeed }}</div>
                            <div class="unit">MB/s</div>
                        </div>
                        <div class="speed_t2">
                            <div><h3>t2</h3></div>
                            <div class="speed-box" style="margin-left: 40px;">{{ t2Net_downSpeed }}</div>
                            <div class="unit">MB/s</div>
                        </div>
                        <div class="speed_t3">
                            <div><h3>t3</h3></div>
                            <div class="speed-box" style="margin-left: 40px;">{{ t3Net_downSpeed }}</div>
                            <div class="unit">MB/s</div>
                        </div>
                    </div>
                </div>
                <div class="uplink_speed">
                    <div>
                        <h3 class="h">上行速率</h3>
                    </div>
                    <div class="uplink">
                        <div class="speed_kctd">
                            <div><h3>kctd</h3></div>
                            <div class="speed-box">{{ kctdNet_upSpeed }}</div>
                            <div class="unit">MB/s</div>
                        </div>
                        <div class="speed_t2">
                            <div><h3>t2</h3></div>
                            <div class="speed-box" style="margin-left: 40px;">{{ t2Net_upSpeed }}</div>
                            <div class="unit">MB/s</div>
                        </div>
                        <div class="speed_t3">
                            <div><h3>t3</h3></div>
                            <div class="speed-box" style="margin-left: 40px;">{{ t3Net_upSpeed }}</div>
                            <div class="unit">MB/s</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="disk" style="width: 50%;">
            <div>
                <h2 class="h">磁盘</h2>
            </div>
            <div style="display: flex; flex-direction: row;">
                <div class="downward_speed">
                    <div>
                        <h3 class="h">读取速度</h3>
                    </div>
                    <div class="downward">
                        <div class="speed_kctd">
                            <div><h3>kctd</h3></div>
                            <div class="speed-box">{{kctdDisk_readSpeed}}</div>
                            <div class="unit">MB/s</div>
                        </div>
                        <div class="speed_t2">
                            <div><h3>t2</h3></div>
                            <div class="speed-box" style="margin-left: 40px;">{{t2Disk_readSpeed}}</div>
                            <div class="unit">MB/s</div>
                        </div>
                        <div class="speed_t3">
                            <div><h3>t3</h3></div>
                            <div class="speed-box" style="margin-left: 40px;">{{t3Disk_readSpeed}}</div>
                            <div class="unit">MB/s</div>
                        </div>
                    </div>
                </div>
                <div class="uplink_speed">
                    <div>
                        <h3 class="h">写入速度</h3>
                    </div>
                    <div class="uplink">
                        <div class="speed_kctd">
                            <div><h3>kctd</h3></div>
                            <div class="speed-box">{{ kctdDisk_writeSpeed }}</div>
                            <div class="unit">MB/s</div>
                        </div>
                        <div class="speed_t2">
                            <div><h3>t2</h3></div>
                            <div class="speed-box" style="margin-left: 40px;">{{t2Disk_writeSpeed}}</div>
                            <div class="unit">MB/s</div>
                        </div>
                        <div class="speed_t3">
                            <div><h3>t3</h3></div>
                            <div class="speed-box" style="margin-left: 40px;">{{t3Disk_writeSpeed}}</div>
                            <div class="unit">MB/s</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  </template>
  
<script>
import Cpukctd from "../components/chart/cpu/Cpu_Kctd_Pie.vue"
import CpuT1 from "../components/chart/cpu/Cpu_T1_Pie.vue"
import CpuT2 from "../components/chart/cpu/Cpu_T2_Pie.vue"
import Memorykctd from "../components/chart/memory/Memory_Kctd_Pie.vue"
import MemoryT1 from "../components/chart/memory/Memory_T1_Pie.vue"
import MemoryT2 from "../components/chart/memory/Memory_T2_Pie.vue"
import axios from 'axios';
// const link_cpu_kctd = 'sum((1-sum without (mode) (rate(node_cpu_seconds_total{job="node-exporter", mode=~"idle|iowait|steal", instance="kctd"}[5m]))) / ignoring(cpu) group_left count without (cpu, mode) (node_cpu_seconds_total{job="node-exporter", mode="idle", instance="kctd"}) ) / sum(count without (cpu) (node_cpu_seconds_total{instance="kctd", mode="system"}))'
// const url = `/cloud/api/v1/query?query=${link_cpu_kctd}`
export default {
    // 组件选项
    components: {
        Cpukctd,
        CpuT1,
        CpuT2,
        Memorykctd,
        MemoryT1,
        MemoryT2,
    },
    data() {
        return {
        /**
         * 服务器的cpu负载
         */
        link_cpu_kctd:'sum((1-sum without (mode) (rate(node_cpu_seconds_total{job="node-exporter", mode=~"idle|iowait|steal", instance="kctd"}[5m]))) / ignoring(cpu) group_left count without (cpu, mode) (node_cpu_seconds_total{job="node-exporter", mode="idle", instance="kctd"}) ) / sum(count without (cpu) (node_cpu_seconds_total{instance="kctd", mode="system"}))',
        link_cpu_t2:'sum( (1 - sum without (mode) (rate(node_cpu_seconds_total{job="node-exporter", mode=~"idle|iowait|steal", instance="t2"}[5m]))) / ignoring(cpu) group_left count without (cpu, mode) (node_cpu_seconds_total{job="node-exporter", mode="idle", instance="t2"}) ) / sum(count without (cpu) (node_cpu_seconds_total{instance="t2", mode="system"}))',
        link_cpu_t3:'sum( (1 - sum without (mode) (rate(node_cpu_seconds_total{job="node-exporter", mode=~"idle|iowait|steal", instance="t3"}[5m]))) / ignoring(cpu) group_left count without (cpu, mode) (node_cpu_seconds_total{job="node-exporter", mode="idle", instance="t3"}) ) / sum(count without (cpu) (node_cpu_seconds_total{instance="t3", mode="system"}))',
        cpu_kctd: 0,
        cpu_t2:0,
        cpu_t3:0,
        /**
         * 服务器的内存负载
         */
        link_Memory_kctd:'100-(avg(node_memory_MemAvailable_bytes{job="node-exporter", instance="kctd"})/avg(node_memory_MemTotal_bytes{job="node-exporter",instance="kctd"})*100)',
        link_Memory_t2:'100-(avg(node_memory_MemAvailable_bytes{job="node-exporter", instance="t2"})/avg(node_memory_MemTotal_bytes{job="node-exporter",instance="kctd"})*100)',
        link_Memory_t3:'100-(avg(node_memory_MemAvailable_bytes{job="node-exporter", instance="t3"})/avg(node_memory_MemTotal_bytes{job="node-exporter",instance="t3"})*100)',
        memory_kctd: 0,
        memory_t2:0,
        memory_t3:0,
        /**
         * 服务器的网络下行速度
         */
        link_kctdNet_downSpeed:'rate(node_network_receive_bytes_total{job="node-exporter", instance="kctd", device="eno1"}[5m]) / 1024',
        link_t2Net_downSpeed:'rate(node_network_receive_bytes_total{job="node-exporter", instance="t2", device="enp7s0"}[5m]) / 1024',
        link_t3Net_downSpeed:'rate(node_network_receive_bytes_total{job="node-exporter", instance="t3", device="enp3s0"}[5m]) / 1024',
        kctdNet_downSpeed: 0,
        t2Net_downSpeed: 0,
        t3Net_downSpeed: 0,
        /**
         * 服务器的网络上行速度
         */
        link_kctdNet_upSpeed:'rate(node_network_transmit_bytes_total{job="node-exporter", instance="kctd", device="eno1"}[5m]) / 1024',
        link_t2Net_upSpeed:'rate(node_network_transmit_bytes_total{job="node-exporter", instance="t2", device="enp7s0"}[5m]) / 1024',
        link_t3Net_upSpeed:'rate(node_network_transmit_bytes_total{job="node-exporter", instance="t3", device="enp3s0"}[5m]) / 1024',
        kctdNet_upSpeed: 0,
        t2Net_upSpeed: 0,
        t3Net_upSpeed: 0,
        /**
         * 服务器的磁盘读取速度
         */
        link_kctdDisk_readSpeed:'sum%28rate%28node_disk_read_bytes_total%7Bjob%3D%22node-exporter%22%2C+instance%3D%22kctd%22%2C+device%3D%7E%22mmcblk.p.%2B%7Cnvme.%2B%7Crbd.%2B%7Csd.%2B%7Cvd.%2B%7Cxvd.%2B%7Cdm-.%2B%7Cdasd.%2B%22%7D%5B5m%5D%29%29%2F1024',
        link_t2Disk_readSpeed:'sum%28rate%28node_disk_read_bytes_total%7Bjob%3D%22node-exporter%22%2C+instance%3D%22t2%22%2C+device%3D%7E%22mmcblk.p.%2B%7Cnvme.%2B%7Crbd.%2B%7Csd.%2B%7Cvd.%2B%7Cxvd.%2B%7Cdm-.%2B%7Cdasd.%2B%22%7D%5B5m%5D%29%29%2F1024',
        link_t3Disk_readSpeed:'sum%28rate%28node_disk_read_bytes_total%7Bjob%3D%22node-exporter%22%2C+instance%3D%22t3%22%2C+device%3D%7E%22mmcblk.p.%2B%7Cnvme.%2B%7Crbd.%2B%7Csd.%2B%7Cvd.%2B%7Cxvd.%2B%7Cdm-.%2B%7Cdasd.%2B%22%7D%5B5m%5D%29%29%2F1024',
        kctdDisk_readSpeed: 0,
        t2Disk_readSpeed: 0,
        t3Disk_readSpeed: 0,
        /**
         * 服务器的磁盘写入速度
         */
        link_kctdDisk_writeSpeed:'sum%28rate%28node_disk_written_bytes_total%7Bjob%3D%22node-exporter%22%2C+instance%3D%22kctd%22%2C+device%3D%7E%22mmcblk.p.%2B%7Cnvme.%2B%7Crbd.%2B%7Csd.%2B%7Cvd.%2B%7Cxvd.%2B%7Cdm-.%2B%7Cdasd.%2B%22%7D%5B5m%5D%29%29%2F1024',
        link_t2Disk_writeSpeed:'sum%28rate%28node_disk_written_bytes_total%7Bjob%3D%22node-exporter%22%2C+instance%3D%22t2%22%2C+device%3D%7E%22mmcblk.p.%2B%7Cnvme.%2B%7Crbd.%2B%7Csd.%2B%7Cvd.%2B%7Cxvd.%2B%7Cdm-.%2B%7Cdasd.%2B%22%7D%5B5m%5D%29%29%2F1024',
        link_t3Disk_writeSpeed:'sum%28rate%28node_disk_written_bytes_total%7Bjob%3D%22node-exporter%22%2C+instance%3D%22t3%22%2C+device%3D%7E%22mmcblk.p.%2B%7Cnvme.%2B%7Crbd.%2B%7Csd.%2B%7Cvd.%2B%7Cxvd.%2B%7Cdm-.%2B%7Cdasd.%2B%22%7D%5B5m%5D%29%29%2F1024',
        kctdDisk_writeSpeed: 0,
        t2Disk_writeSpeed: 0,
        t3Disk_writeSpeed: 0,
        };
    },
    /**
     * 初始化加载数据
     */
    created() {
        this.fetch_CPU_kctd();
        this.fetch_CPU_t2();
        this.fetch_CPU_t3();

        this.fetch_Memory_kctd();
        this.fetch_Memory_t2();
        this.fetch_Memory_t3();

        this.fetch_kctdNet_downSpeed()
        this.fetch_t2Net_downSpeed()
        this.fetch_t3Net_downSpeed()

        this.fetch_kctdNet_upSpeed()
        this.fetch_t2Net_upSpeed()
        this.fetch_t3Net_upSpeed()

        this.fetch_kctdDisk_readSpeed()
        this.fetch_t2Disk_readSpeed()
        this.fetch_t3Disk_readSpeed()

        this.fetch_kctdDisk_writeSpeed()
        this.fetch_t2Disk_writeSpeed()
        this.fetch_t3Disk_writeSpeed()

        this.startFetchingCPU(); // 在组件创建时开始执行定时任务
    },
    /**
     * 每隔30秒刷新一次数据
     */
    methods: {
        startFetchingCPU() {
            this.intervalId = setInterval(async () => {
                await this.fetch_CPU_kctd();
                await this.fetch_CPU_t2();
                await this.fetch_CPU_t3();

                await this.fetch_Memory_kctd();
                await this.fetch_Memory_t2();
                await this.fetch_Memory_t3();

                await this.fetch_kctdNet_downSpeed()
                await this.fetch_t2Net_downSpeed()
                await this.fetch_t3Net_downSpeed()

                await this.fetch_kctdNet_upSpeed()
                await this.fetch_t2Net_upSpeed()
                await this.fetch_t3Net_upSpeed()

                await this.fetch_kctdDisk_readSpeed()
                await this.fetch_t2Disk_readSpeed()
                await this.fetch_t3Disk_readSpeed()

                await this.fetch_kctdDisk_writeSpeed()
                await this.fetch_t2Disk_writeSpeed()
                await this.fetch_t3Disk_writeSpeed()

            }, 30000);
        },
        /**
         * 
         * 服务器的CPU负载，百分比展示
         * 
         */
        async fetch_CPU_kctd() {   //获取服务器kctd的cpu负载
          try {
            const response = await axios.get(`/cloud/v1/query?query=${this.link_cpu_kctd}`)
            this.cpu_kctd = Number((Number(response.data.data.result[0].value[1]) * 100).toFixed(2))
            console.log("cpu_kctd", this.cpu_kctd)
          } catch (error) {
            console.error('获取服务器kctd的cpu负载', error);
            this.$message.error('获取服务器kctd的cpu负载失败, 请稍后重试');
          }
        },
        async fetch_CPU_t2() {   //获取服务器t2的cpu负载
          try {
            const response = await axios.get(`/cloud/v1/query?query=${this.link_cpu_t2}`)
            this.cpu_t2 = Number((Number(response.data.data.result[0].value[1]) * 100).toFixed(2))
            console.log('cpu_t2',this.cpu_t2)
          } catch (error) {
            console.error('获取服务器t2的cpu负载', error);
            this.$message.error('获取服务器t2的cpu负载失败, 请稍后重试');
          }
        },
        async fetch_CPU_t3() {   //获取服务器t3的cpu负载
          try {
            const response = await axios.get(`/cloud/v1/query?query=${this.link_cpu_t3}`)
            this.cpu_t3 = Number((Number(response.data.data.result[0].value[1]) * 100).toFixed(2))
            console.log('cpu_t3',this.cpu_t3)
          } catch (error) {
            console.error('获取服务器t3的cpu负载', error);
            this.$message.error('获取服务器t3的cpu负载失败, 请稍后重试');
          }
        },
        /**
         * 
         * 服务器的内存负载，百分比展示
         * 
         */
        async fetch_Memory_kctd() {   //获取服务器kctd的Memory负载
          try {
            const response = await axios.get(`/cloud/v1/query?query=${this.link_Memory_kctd}`)
            this.memory_kctd = Number((Number(response.data.data.result[0].value[1])).toFixed(2))
            console.log("Memory_kctd", this.memory_kctd)
          } catch (error) {
            console.error('获取服务器kctd的Memory负载', error);
            this.$message.error('获取服务器kctd的Memory负载失败, 请稍后重试');
          }
        },
        async fetch_Memory_t2() {   //获取服务器t2的Memory负载
          try {
            const response = await axios.get(`/cloud/v1/query?query=${this.link_Memory_t2}`)
            this.memory_t2 = Number((Number(response.data.data.result[0].value[1])).toFixed(2))
            console.log('Memory_t2',this.memory_t2)
          } catch (error) {
            console.error('获取服务器t2的Memory负载', error);
            this.$message.error('获取服务器t2的Memory负载失败, 请稍后重试');
          }
        },
        async fetch_Memory_t3() {   //获取服务器t3的Memory负载
          try {
            const response = await axios.get(`/cloud/v1/query?query=${this.link_Memory_t3}`)
            this.memory_t3 = Number((Number(response.data.data.result[0].value[1])).toFixed(2))
            console.log('Memory_t3',this.memory_t3)
          } catch (error) {
            console.error('获取服务器t3的Memory负载', error);
            this.$message.error('获取服务器t3的Memory负载失败, 请稍后重试');
          }
        },
        /**
         * 
         * 以下函数用于获取网络的下行速度，数值展示
         * 
         */
        async fetch_kctdNet_downSpeed() {   //获取服务器kctd的Net_downSpeed负载
          try {
            const response = await axios.get(`/cloud/v1/query?query=${this.link_kctdNet_downSpeed}`)
            this.kctdNet_downSpeed = Number(response.data.data.result[0].value[1]/1024).toFixed(2);
            console.log("kctdNet_downSpeed", this.kctdNet_downSpeed)
          } catch (error) {
            console.error('获取服务器kctd的Net_downSpeed负载', error);
            this.$message.error('获取服务器kctd的Net_downSpeed负载失败, 请稍后重试');
          }
        },
        async fetch_t2Net_downSpeed() {   //获取服务器t2的Net_downSpeed负载
            try {
            const response = await axios.get(`/cloud/v1/query?query=${this.link_t2Net_downSpeed}`)
            this.t2Net_downSpeed = Number(response.data.data.result[0].value[1]/1024).toFixed(2);
            console.log("t2Net_downSpeed", this.t2Net_downSpeed)
            } catch (error) {
            console.error('获取服务器t2的Net_downSpeed负载', error);
            this.$message.error('获取服务器t2的Net_downSpeed负载失败, 请稍后重试');
            }
        },
        async fetch_t3Net_downSpeed() {   //获取服务器t3的Net_downSpeed负载
            try {
            const response = await axios.get(`/cloud/v1/query?query=${this.link_t3Net_downSpeed}`)
            this.t3Net_downSpeed = Number(response.data.data.result[0].value[1]/1024).toFixed(2);
            console.log("t3Net_downSpeed", this.t3Net_downSpeed)
            } catch (error) {
            console.error('获取服务器t3的Net_downSpeed负载', error);
            this.$message.error('获取服务器t3的Net_downSpeed负载失败, 请稍后重试');
            }
        },
        /**
         * 
         * 以下函数用于获取网络的上行速度
         * 
         */
         async fetch_kctdNet_upSpeed() {   //获取服务器kctd的Net_upSpeed负载
            try {
            const response = await axios.get(`/cloud/v1/query?query=${this.link_kctdNet_upSpeed}`)
            this.kctdNet_upSpeed = Number(response.data.data.result[0].value[1]/1024).toFixed(2);
            console.log("kctdNet_upSpeed", this.kctdNet_upSpeed)
            } catch (error) {
            console.error('获取服务器kctd的Net_upSpeed负载', error);
            this.$message.error('获取服务器kctd的Net_upSpeed负载失败, 请稍后重试');
            }
        },
        async fetch_t2Net_upSpeed() {   //获取服务器t2的Net_upSpeed负载
            try {
            const response = await axios.get(`/cloud/v1/query?query=${this.link_t2Net_upSpeed}`)
            this.t2Net_upSpeed = Number(response.data.data.result[0].value[1]/1024).toFixed(2);
            console.log("t2Net_upSpeed", this.t2Net_upSpeed)
            } catch (error) {
            console.error('获取服务器t2的Net_upSpeed负载', error);
            this.$message.error('获取服务器t2的Net_upSpeed负载失败, 请稍后重试');
            }
        },
        async fetch_t3Net_upSpeed() {   //获取服务器t3的Net_upSpeed负载
            try {
            const response = await axios.get(`/cloud/v1/query?query=${this.link_t3Net_upSpeed}`)
            this.t3Net_upSpeed = Number(response.data.data.result[0].value[1]/1024).toFixed(2);
            console.log("t3Net_upSpeed", this.t3Net_upSpeed)
            } catch (error) {
            console.error('获取服务器t3的Net_upSpeed负载', error);
            this.$message.error('获取服务器t3的Net_upSpeed负载失败, 请稍后重试');
            }
        },
        /**
         * 
         * 以下函数用于获取磁盘的读取速度
         * 
         */
         async fetch_kctdDisk_readSpeed() {   //获取服务器kctd的Disk_readSpeed负载
            try {
            const response = await axios.get(`/cloud/v1/query?query=${this.link_kctdDisk_readSpeed}`)
            this.kctdDisk_readSpeed = Number(response.data.data.result[0].value[1]/1024).toFixed(2);
            console.log("kctdDisk_readSpeed", this.kctdDisk_readSpeed)
            } catch (error) {
            console.error('获取服务器kctd的Disk_readSpeed负载', error);
            this.$message.error('获取服务器kctd的Disk_readSpeed负载失败, 请稍后重试');
            }
        },
        async fetch_t2Disk_readSpeed() {   //获取服务器t2的Disk_readSpeed负载
            try {
            const response = await axios.get(`/cloud/v1/query?query=${this.link_t2Disk_readSpeed}`)
            this.t2Disk_readSpeed = Number(response.data.data.result[0].value[1]/1024).toFixed(2);
            console.log("t2Disk_readSpeed", this.t2Disk_readSpeed)
            } catch (error) {
            console.error('获取服务器t2的Disk_readSpeed负载', error);
            this.$message.error('获取服务器t2的Disk_readSpeed负载失败, 请稍后重试');
            }
        },
        async fetch_t3Disk_readSpeed() {   //获取服务器t3的Disk_readSpeed负载
            try {
            const response = await axios.get(`/cloud/v1/query?query=${this.link_t3Disk_readSpeed}`)
            this.t3Disk_readSpeed = Number(response.data.data.result[0].value[1]/1024).toFixed(2);
            console.log("t3Disk_readSpeed", this.t3Disk_readSpeed)
            } catch (error) {
            console.error('获取服务器t3的Disk_readSpeed负载', error);
            this.$message.error('获取服务器t3的Disk_readSpeed负载失败, 请稍后重试');
            }
        },
        /**
         * 
         * 以下函数用于获取磁盘的写入速度
         * 
         */
         async fetch_kctdDisk_writeSpeed() {   //获取服务器kctd的Disk_writeSpeed负载
            try {
            const response = await axios.get(`/cloud/v1/query?query=${this.link_kctdDisk_writeSpeed}`)
            this.kctdDisk_writeSpeed = Number(response.data.data.result[0].value[1]/1024).toFixed(2);
            console.log("kctdDisk_writeSpeed", this.kctdDisk_writeSpeed)
            } catch (error) {
            console.error('获取服务器kctd的Disk_writeSpeed负载', error);
            this.$message.error('获取服务器kctd的Disk_writeSpeed负载失败, 请稍后重试');
            }
        },
        async fetch_t2Disk_writeSpeed() {   //获取服务器t2的Disk_writeSpeed负载
            try {
            const response = await axios.get(`/cloud/v1/query?query=${this.link_t2Disk_writeSpeed}`)
            this.t2Disk_writeSpeed = Number(response.data.data.result[0].value[1]/1024).toFixed(2);
            console.log("t2Disk_writeSpeed", this.t2Disk_writeSpeed)
            } catch (error) {
            console.error('获取服务器t2的Disk_writeSpeed负载', error);
            this.$message.error('获取服务器t2的Disk_writeSpeed负载失败, 请稍后重试');
            }
        },
        async fetch_t3Disk_writeSpeed() {   //获取服务器t3的Disk_writeSpeed负载
            try {
            const response = await axios.get(`/cloud/v1/query?query=${this.link_t3Disk_writeSpeed}`)
            this.t3Disk_writeSpeed = Number(response.data.data.result[0].value[1]/1024).toFixed(2);
            console.log("t3Disk_writeSpeed", this.t3Disk_writeSpeed)
            } catch (error) {
            console.error('获取服务器t3的Disk_writeSpeed负载', error);
            this.$message.error('获取服务器t3的Disk_writeSpeed负载失败, 请稍后重试');
            }
        },
        openGrafana() {
            window.open('http://10.112.184.214:32000/d/ItkMV59Sz/node-exporter-nodes?orgId=1&refresh=30s', '_blank');
        }
    },
    beforeDestroy() {
        // 组件销毁前清除定时器，避免内存泄漏和不必要的请求
        clearInterval(this.intervalId);
    }
}
</script>

<style scoped>

.cpu_load, .memory_load,
.network, .disk
 {
  flex: 1;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
}

.downward_speed, .uplink_speed{
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}
        
.kctd, .t2, .t3
 {
  display: flex;
  flex-direction: column;
  justify-content:center;
  flex: 1;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
  /* background-color: aliceblue; */
}

.load, .network_disk {
  display: flex;
  width: 100%;
  flex: 1;
}

.disk, .network, .cpu_load, .memory_load{
  display: flex;
  flex-direction: column;
  width: 50%;
}

.h{
    margin: 0;
    font-size: 2.4em;
    color: #333;
    display: flex; 
    justify-content: center;
}

input[type="range"] {
  margin-top: 10px;
}

.chart {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.speed_kctd, .speed_t2, .speed_t3{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background-color: #f9f9f9;
}
.speed_t3:last-child {
    border-bottom: none;
}

.speed-box {
    /* width: 20%; */
    display: inline-block;
    padding: 5px 10px;
    background-color: #007BFF;
    background-image: linear-gradient(to right, #007BFF 0%, #007BFF 100%);
    background-size: 100% 100%; /* 宽度100%，高度100% */
    background-repeat: no-repeat; /* 防止重复 */
    color: #ffffff;
    border-radius: 4px;
    font-weight: bold;
    font-size: 2.4em;
    text-align:center
}

.downward, .uplink{
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 70%;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h3 {
    margin: 0;
    font-size: 2.4em;
    color: #333;
}
.unit {
    font-size: 2.4em;
    color: #666;
}

.btn {
    padding: 6px 12px;
    border: none;
    background-color: #007bff; /* 设置按钮背景颜色为蓝色 */
    color: #ffffff; /* 设置按钮文字颜色为白色 */
    border-radius: 4px; /* 添加圆角边框 */
    cursor: pointer;
    transition: background-color 0.3s ease; /* 添加过渡效果 */
}
</style>