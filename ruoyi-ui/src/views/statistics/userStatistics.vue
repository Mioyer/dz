<template>
  <div class="userStatisticsMain">
    <el-scrollbar style="width:100%;height: 100%;">
      <div class="top" v-loading="tabLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 1)">
        <div class="content-box">
          <div class="topHeader">
            <div class="titleBox">
              <BlockTitle :title="'数据概览'" />
            </div>
          </div>
          <div class="content-top">
            <div class="topItem" v-for="(item, index) in topInfoArray" :key="index" @click="openUrl(item.url)">
              <img :src="item.img" alt="" />
              <div class="flex-right">
                <div class="topItemName">{{ item.name }}</div>
                <div class="topItemValue">{{ item.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template v-if="isAdmin">
        <div class="chart" v-loading="chartLoading" element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 1)">
          <div class="content-box">
            <div class="titleBox">
              <BlockTitle :title="'销售统计'" />
            </div>
            <div class="content" style="background-color: white; padding: 20px;">
              <div ref="chart" style="width:100%;height: 400px;"></div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="isAdmin">
        <div class="chart" v-loading="rechargeChartLoading" element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 1)">
          <div class="content-box">
            <div class="titleBox">
              <BlockTitle :title="'充值与退款统计'" />
            </div>
            <div class="content" style="background-color: white; padding: 20px;">
              <div ref="rechargeChart" style="width:100%;height: 400px;"></div>
            </div>
          </div>
        </div>
      </template>
    </el-scrollbar>
  </div>
</template>

<script>
import BlockTitle from '@/components/blockTitle/blockTitle.vue';
import {
  getUsersAndSales,
  getNewUserCount,
  getPilesInfo,
  getDayRecharge,
  getManageTotalData,
  getSalesData, // 导入 getSalesData
  getTotalPowerConsumption, // 导入 getTotalPowerConsumption
  getOnlineDevices, // 导入 getOnlineDevices
  getOfflineDevices, // 导入 getOfflineDevices
  getRechargeAndRefundByDays, // 导入 getRechargeAndRefundByDays
} from '@/api/statistics';
import * as echarts from 'echarts';

export default {
  components: {
    BlockTitle,
  },

  data() {
    return {
      tabLoading: true,
      chartLoading: true,
      topInfoArray: [
        {
          name: "累计交易额(元)",
          value: "",
          prop: "sumSales",
          url: "#",
          img: require("../../assets/index/index_1.png"),
        },
        {
          name: "累计订单数 (个)",
          value: "",
          prop: "sumCount",
          url: "/orderList",
          img: require("../../assets/index/index_2.png"),
        },
        {
          name: "退款金额（元）",
          value: "",
          prop: "reSales",
          url: "/refund",
          img: require("../../assets/index/index_3.png"),
        },
        {
          name: "累计注册用户",
          value: "",
          prop: "userCount",
          url: "/registerUser",
          img: require("../../assets/index/index_4.png"),
        },
        {
          name: "累计充值（元）",
          value: "",
          prop: "rechargeAmount",
          url: "#",
          img: require("../../assets/index/index_5.png"),
        },
        {
          name: "总站点数",
          value: "",
          prop: "plotList",
          url: "/device/plotList",
          img: require("../../assets/index/index_6.png"),
        },
        {
          name: "总设备数",
          value: "",
          prop: "deviceList",
          url: "/device/deviceList",
          img: require("../../assets/index/index_7.png"),
        },
        {
          name: "累计充电量(度)",
          value: "",
          prop: "totalPowerConsumption",
          url: "#",
          img: require("../../assets/index/index_8.png"),
        },
        {
          name: "运行设备",
          value: "",
          prop: "onLine",
          url: "#",
          img: require("../../assets/index/index_9.png"),
        },
        {
          name: "离线设备",
          value: "",
          prop: "offLine",
          url: "#",
          img: require("../../assets/index/index_10.png"),
        },
      ],
      isAdmin: true, // 根据实际情况设置
      myChart: null,
      barData: [],
      barData2: [],
      lineData: [],
      lineData2: [],
      lineData3: [],
      xData: [],
      rechargeChartLoading: true,
      rechargeData: [],
      refundData: [],
      rechargeXData: [],
    };
  },

  created() {
    this.getInitialData();
    if (this.isAdmin) {
      this.getSalesData();
      this.getRechargeAndRefundData(); // 新增：获取充值和退款数据
    }
  },

  methods: {
    async getInitialData() {
      try {
        // 获取用户和销售数据
        const usersAndSalesResponse = await getUsersAndSales({});
        const { userCount, salesAmount } = usersAndSalesResponse.data;

        // 获取新用户数量
        const newUserCountResponse = await getNewUserCount({});
        const newUserCount = newUserCountResponse.data.newUserCount;

        // 获取总站点数
        const pilesInfoResponse = await getPilesInfo({});
        const totalPlots = pilesInfoResponse.data.total;

        // 获取每日充值数据
        const dayRechargeResponse = await getDayRecharge({});
        const rechargeAmount = dayRechargeResponse.data.dayRecharge;

        // 获取管理总数据
        const manageTotalDataResponse = await getManageTotalData({});
        const { totalSales, totalUsers, totalPiles } = manageTotalDataResponse.data;

        // 获取累计充电量
        const totalPowerConsumptionResponse = await getTotalPowerConsumption({});
        const totalPowerConsumption = totalPowerConsumptionResponse.data.totalPowerConsumption;

        // 获取在线设备数量
        const onlineDevicesResponse = await getOnlineDevices({});
        const onLine = onlineDevicesResponse.data.onLine;

        // 获取离线设备数量
        const offlineDevicesResponse = await getOfflineDevices({});
        const offLine = offlineDevicesResponse.data.offLine;

        // 初始化 topInfoArray
        this.topInfoArray = this.topInfoArray.map(item => {
          switch (item.prop) {
            case "sumSales":
              item.value = salesAmount;
              break;
            case "sumCount":
              item.value = totalSales;
              break;
            case "reSales":
              item.value = totalSales; // 这里假设 totalSales 包含退款金额
              break;
            case "userCount":
              item.value = newUserCount;
              break;
            case "rechargeAmount":
              item.value = rechargeAmount;
              break;
            case "plotList":
              item.value = totalPlots;
              break;
            case "deviceList":
              item.value = totalPiles; // 假设 deviceList 为 totalPiles
              break;
            case "totalPowerConsumption":
              item.value = totalPowerConsumption;
              break;
            case "onLine":
              item.value = onLine;
              break;
            case "offLine":
              item.value = offLine;
              break;
            default:
              break;
          }
          return item;
        });

        this.tabLoading = false;
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
        this.tabLoading = false;
      }
    },

    async getSalesData() {
      try {
        const salesDetailResponse = await getSalesData({ pageNo: 1, pageSize: 7 });

        this.barData = salesDetailResponse.data.records.map((item) => item.sumCount);
        this.barData2 = salesDetailResponse.data.records.map((item) => item.validCount);
        this.lineData = salesDetailResponse.data.records.map((item) => item.sumSales);
        this.lineData2 = salesDetailResponse.data.records.map((item) => item.reSales);
        this.lineData3 = salesDetailResponse.data.records.map((item) => item.reCount);
        this.xData = salesDetailResponse.data.records.map((item) => new Date(item.createTime).toLocaleDateString());

        this.chartLoading = false;
        this.barChart();
      } catch (error) {
        console.error('Failed to fetch sales data:', error);
        this.chartLoading = false;
      }
    },

    barChart() {
      this.myChart = echarts.init(this.$refs.chart);

      const option = {
        grid: {
          top: "15%",
          bottom: "10%",
          left: "2%",
          right: "0%",
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.9)",
          padding: 10,
          className: "echarts-tooltip",
          textStyle: {
            color: "#000",
          },
        },
        legend: {
          show: true,
          data: ["订单数", "有效订单数", "销售总额", "退款总额", "退款订单数"],
          top: "0%",
          right: "5%",
          itemWidth: 10, // 设置图例标记的宽度
          itemHeight: 10, // 设置图例标记的高度
          itemGap: 10, // 设置图例之间的间距
          textStyle: {
            color: "#000", // 将图例文字颜色改为黑色
          },
          backgroundColor: 'rgba(240, 240, 240, 0.8)', // 为图例添加灰色背景
          borderColor: '#ccc', // 可选：设置边框颜色
          borderWidth: 1, // 可选：设置边框宽度
          borderRadius: 4, // 可选：设置圆角
          padding: 10, // 可选：设置内边距
        },
        xAxis: {
          type: "category",
          data: this.xData,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#5A6883",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#5A6883",
            },
          },
        },
        yAxis: [
          {
            type: "value",
            name: '数量',
            position: 'left',
            splitLine: {
              show: true,
              lineStyle: {
                type: "dotted",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              formatter: "{value}",
              textStyle: {
                color: "#5A6883",
              },
            },
          },
          {
            type: "value",
            name: '金额(元)',
            position: 'right',
            splitLine: {
              show: true,
              lineStyle: {
                type: "dotted",
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              formatter: "{value}",
              textStyle: {
                color: "#5A6883",
              },
            },
          },
        ],
        series: [
          {
            name: "订单数",
            type: "bar",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "#1A5CD6",
              },
            },
            data: this.barData,
          },
          {
            name: "有效订单数",
            type: "bar",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "#148C77",
              },
            },
            data: this.barData2,
          },
          {
            name: "销售总额",
            type: "line",
            smooth: false,
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 10,
            itemStyle: {
              color: "#8B23BD",
            },
            lineStyle: {
              color: "#8B23BD",
              width: 3,
            },
            yAxisIndex: 1,
            data: this.lineData,
          },
          {
            name: "退款总额",
            type: "line",
            smooth: false,
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 10,
            itemStyle: {
              color: "#EB6100",
            },
            lineStyle: {
              color: "#EB6100",
              width: 3,
            },
            yAxisIndex: 1,
            data: this.lineData2,
          },
          {
            name: "退款订单数",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 10,
            itemStyle: {
              color: "#DF2525",
            },
            lineStyle: {
              color: "#DF2525",
              width: 3,
            },
            yAxisIndex: 0, // 使用左侧 Y 轴
            data: this.lineData3,
          },
        ],
      };

      this.myChart.setOption(option);

      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },

    async getRechargeAndRefundData() {
      try {
        const response = await getRechargeAndRefundByDays({});

        this.rechargeXData = response.data.records.map(item => item.date);
        this.rechargeData = response.data.records.map(item => item.rechargeAmount);
        this.refundData = response.data.records.map(item => item.refundAmount);

        this.rechargeChartLoading = false;
        this.drawRechargeChart();
      } catch (error) {
        console.error('Failed to fetch recharge and refund data:', error);
        this.rechargeChartLoading = false;
      }
    },
    drawRechargeChart() {
      if (!this.$refs.rechargeChart) return;

      this.myRechargeChart = echarts.init(this.$refs.rechargeChart);
      const option = {
        title: { text: '充值与退款统计' },
        tooltip: { trigger: 'axis' },
        xAxis: [
          {
            type: 'category',
            data: this.rechargeXData,
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '金额(元)',
            position: 'left',
            axisLabel: { formatter: '{value} 元' },
          }
        ],
        series: [
          {
            name: '充值金额',
            type: 'line',
            data: this.rechargeData,
            symbol: 'circle',
            symbolSize: 10,
            lineStyle: { color: '#8B23BD', width: 3 },
          },
          {
            name: '退款金额',
            type: 'line',
            data: this.refundData,
            symbol: 'circle',
            symbolSize: 10,
            lineStyle: { color: '#EB6100', width: 3 },
          }
        ]
      };
      this.myRechargeChart.setOption(option);

      window.addEventListener("resize", () => {
        this.myRechargeChart.resize();
      });
    },

    openUrl(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style lang="scss" scoped>
.userStatisticsMain {
  background-color: #eceef1;
  width: 100%;
  position: relative;

  .content-box {
    height: 100%;
  }

  .downloadExcel {
    font-size: 14px;
    margin-right: 5px;
    cursor: pointer;
  }

  .downloadExcel:hover {
    color: #1a5cd6;
  }

  ::v-deep .el-scrollbar__view {
    >div {
      margin-bottom: 20px;
    }

    padding: 20px;
    overflow-x: hidden;
  }

  .top {
    width: 100%;

    .content-top {
      width: 100%;
      margin-top: 16px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .topItem {
        img {
          padding-left: 10px;
          height: 66px;
          margin-right: 16px;
        }

        &:nth-child(5n) {
          margin-left: 0;
        }

        margin-right: 16px;
        background-color: #fff;
        padding: 10px;
        width: calc(20% - 16px);
        margin-bottom: 16px;
        height: 135px;
        display: flex;
        align-items: center;
        font-size: 26px;
        color: #666666;

        .topItemName {
          font-size: 16px;
          color: #000000;
          opacity: 0.45;
        }
      }
    }
  }
}
</style>