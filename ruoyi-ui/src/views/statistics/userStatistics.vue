<template>
  <div class="userStatisticsMain">
    <el-scrollbar style="width:100%;height: 100%;">
      <div
        class="top"
        v-loading="tabLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 1)"
      >
        <div class="content-box">
          <div class="topHeader">
            <div class="titleBox">
              <BlockTitle :title="'数据概览'" />
            </div>
          </div>
          <div class="content-top">
            <div
              class="topItem"
              v-for="(item, index) in topInfoArray"
              :key="index"
              @click="openUrl(item.url)"
            >
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
        <div
          class="chart"
          v-loading="chartLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 1)"
        >
          <div class="content-box">
            <div class="titleBox">
              <BlockTitle :title="'销售统计'" />
            </div>
            <div class="content" style="background-color: white; padding: 20px;">
              <div ref="chart" style="width:100%;height: 400px;"></div>
            </div>
          </div>
        </div>
        <div
          class="chart"
          v-loading="rechargeChartLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 1)"
        >
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
      <template v-if="isAdmin">
        <div
          class="chart"
          v-loading="deviceChartLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 1)"
        >
          <div class="content-box">
            <div class="titleBox">
              <BlockTitle :title="'设备统计'" />
            </div>
            <div
              class="content device-charts"
              style="background-color: white; padding: 20px;"
            >
              <div class="chart-item" ref="deviceStatusChart"></div>
              <div class="chart-item" ref="faultReasonChart"></div>
            </div>
          </div>
        </div>
      </template>
    </el-scrollbar>
  </div>
</template>

<script>
import BlockTitle from '@/components/blockTitle/blockTitle.vue';
import * as stats from '@/api/statistics';
import * as echarts from 'echarts';

export default {
  components: {
    BlockTitle,
  },
  data() {
    return {
      tabLoading: true,
      chartLoading: true,
      rechargeChartLoading: true,
      deviceChartLoading: true,
      topInfoArray: [
        { name: "累计交易额(元)", value: "", prop: "sumSales", url: "#", img: require("../../assets/index/index_1.png") },
        { name: "累计订单数 (个)", value: "", prop: "sumCount", url: "/orderList", img: require("../../assets/index/index_2.png") },
        { name: "退款金额（元）", value: "", prop: "reSales", url: "/refund", img: require("../../assets/index/index_3.png") },
        { name: "累计注册用户", value: "", prop: "userCount", url: "/registerUser", img: require("../../assets/index/index_4.png") },
        { name: "累计充值（元）", value: "", prop: "dayRecharge", url: "#", img: require("../../assets/index/index_5.png") },
        { name: "总站点数", value: "", prop: "plotList", url: "/device/plotList", img: require("../../assets/index/index_6.png") },
        { name: "总设备数", value: "", prop: "deviceList", url: "/device/deviceList", img: require("../../assets/index/index_7.png") },
        { name: "累计充电量(度)", value: "", prop: "totalPowerConsumption", url: "#", img: require("../../assets/index/index_8.png") },
        { name: "运行设备", value: "", prop: "onLine", url: "#", img: require("../../assets/index/index_9.png") },
        { name: "离线设备", value: "", prop: "offLine", url: "#", img: require("../../assets/index/index_10.png") },
      ],
      isAdmin: true, // 根据实际情况设置
      myChart: null,
      barData: [],
      barData2: [],
      lineData: [],
      lineData2: [],
      lineData3: [],
      xData: [],
      rechargeXData: [],
      rechargeData: [],
      refundData: [],
      deviceStatus: {},
      faultReasons: {}
    };
  },
  created() {
    this.getInitialData();
    if (this.isAdmin) {
      this.getSalesData();
      this.getRechargeAndRefundData(); // 获取充值和退款数据
      this.getDeviceStatistics(); // 获取设备统计信息
    }
  },
  methods: {
    async getInitialData() {
      try {
        const [usersAndSales, newUserCount, pilesInfo, dayRecharge, manageTotalData] = await Promise.all([
          stats.getUsersAndSales(),
          stats.getNewUserCount(),
          stats.getPilesInfo(),
          stats.getDayRecharge(),
          stats.getManageTotalData()
        ]);
        this.topInfoArray.forEach(item => {
          switch (item.prop) {
            case "sumSales":
              item.value = usersAndSales.data.sumSales;
              break;
            case "sumCount":
              item.value = usersAndSales.data.sumCount;
              break;
            case "reSales":
              item.value = usersAndSales.data.reSales;
              break;
            case "userCount":
              item.value = newUserCount.data.newUserCount;
              break;
            case "dayRecharge":
              item.value = dayRecharge.data.dayRecharge;
              break;
            case "plotList":
              item.value = manageTotalData.data.plotList;
              break;
            case "deviceList":
              item.value = manageTotalData.data.deviceList;
              break;
            case "totalPowerConsumption":
              item.value = manageTotalData.data.totalPowerConsumption;
              break;
            case "onLine":
              item.value = manageTotalData.data.onLine;
              break;
            case "offLine":
              item.value = manageTotalData.data.offLine;
              break;
          }
        });
        this.tabLoading = false;
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
        this.tabLoading = false;
      }
    },
    async getSalesData() {
      try {
        const salesDetailResponse = await stats.getSalesData();
        this.xData = salesDetailResponse.data.records.map(item => item.createTime); // 使用生成的日期
        this.barData = salesDetailResponse.data.records.map(item => item.orderCount);
        this.barData2 = salesDetailResponse.data.records.map(item => item.validOrderCount);
        this.lineData = salesDetailResponse.data.records.map(item => item.salesTotal);
        this.lineData2 = salesDetailResponse.data.records.map(item => item.refundTotal);
        this.lineData3 = salesDetailResponse.data.records.map(item => item.refundOrderCount);
        this.chartLoading = false;
        this.initSalesChart();
      } catch (error) {
        console.error('Failed to fetch sales data:', error);
        this.chartLoading = false;
      }
    },
    initSalesChart() {
      if (!this.myChart) {
        this.myChart = echarts.init(this.$refs.chart);
      }
      const option = {
        title: { text: '销售统计' },
        tooltip: { trigger: 'axis' },
        legend: { data: ['订单数', '有效订单数', '销售额', '退款额', '退款订单数'] },
        xAxis: { type: 'category', data: this.xData },
        yAxis: { type: 'value' },
        series: [
          { name: '订单数', type: 'bar', data: this.barData },
          { name: '有效订单数', type: 'bar', data: this.barData2 },
          { name: '销售额', type: 'line', data: this.lineData },
          { name: '退款额', type: 'line', data: this.lineData2 },
          { name: '退款订单数', type: 'line', data: this.lineData3 }
        ]
      };
      this.myChart.setOption(option);
    },
    async getRechargeAndRefundData() {
      try {
        const response = await stats.getRechargeAndRefundByDays();
        this.rechargeXData = response.data.records.map(item => item.date); // 使用生成的日期
        this.rechargeData = response.data.records.map(item => item.rechargeAmount);
        this.refundData = response.data.records.map(item => item.refundAmount);
        this.rechargeChartLoading = false;
        this.initRechargeChart();
      } catch (error) {
        console.error('Failed to fetch recharge and refund data:', error);
        this.rechargeChartLoading = false;
      }
    },
    initRechargeChart() {
      if (!this.rechargeChart) {
        this.rechargeChart = echarts.init(this.$refs.rechargeChart);
      }
      const option = {
        title: { text: '充值与退款统计' },
        tooltip: { trigger: 'axis' },
        legend: { data: ['充值金额', '退款金额'] },
        xAxis: { type: 'category', data: this.rechargeXData },
        yAxis: { type: 'value' },
        series: [
          { name: '充值金额', type: 'bar', data: this.rechargeData },
          { name: '退款金额', type: 'bar', data: this.refundData }
        ]
      };
      this.rechargeChart.setOption(option);
    },
    async getDeviceStatistics() {
      try {
        const response = await stats.getDeviceStatistics();
        this.deviceStatus = response.data.deviceStatus;
        this.faultReasons = response.data.faultReasons;
        this.deviceChartLoading = false;
        this.initDeviceCharts();
      } catch (error) {
        console.error('Failed to fetch device statistics:', error);
        this.deviceChartLoading = false;
      }
    },
    initDeviceCharts() {
      if (!this.deviceStatusChart) {
        this.deviceStatusChart = echarts.init(this.$refs.deviceStatusChart);
      }
      if (!this.faultReasonChart) {
        this.faultReasonChart = echarts.init(this.$refs.faultReasonChart);
      }
      const deviceStatusOption = {
        title: { text: '设备状态统计' },
        tooltip: { trigger: 'item' },
        legend: { top: '5%', left: 'center' },
        series: [
          {
            name: '设备状态',
            type: 'pie',
            radius: ['40%', '70%'],
            data: [
              { value: this.deviceStatus.using, name: '使用中' },
              { value: this.deviceStatus.faulty, name: '故障中' },
              { value: this.deviceStatus.idle, name: '空闲中' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      const faultReasonOption = {
        title: { text: '故障原因统计' },
        tooltip: { trigger: 'item' },
        legend: { top: '5%', left: 'center' },
        series:         [
          {
            name: '故障原因',
            type: 'pie',
            radius: ['40%', '70%'],
            data: [
              { value: this.faultReasons.overTempAlert, name: '过温告警' },
              { value: this.faultReasons.plugDamaged, name: '充电插头损坏' },
              { value: this.faultReasons.contactorFault, name: '接触器故障' },
              { value: this.faultReasons.gunDamage, name: '枪口损坏' },
              { value: this.faultReasons.offline, name: '离线' },
              { value: this.faultReasons.powerOff, name: '断电' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      this.deviceStatusChart.setOption(deviceStatusOption);
      this.faultReasonChart.setOption(faultReasonOption);
    },
    openUrl(url) {
      // 导航逻辑
      if (url) {
        this.$router.push(url);
      }
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

    &:hover {
      color: #1a5cd6;
    }
  }

  ::v-deep .el-scrollbar__view {
    > div {
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

  .userStatisticsMain {
    .chart .content {
      display: flex;
      justify-content: space-between;

      .chart-item {
        width: 45%;
      }
    }
  }

  .device-charts {
    display: flex;
    justify-content: space-between;

    .chart-item {
      width: 45%;
      height: 400px;
      overflow: hidden;
    }
  }
}
</style>