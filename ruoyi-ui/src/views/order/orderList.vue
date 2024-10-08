<template>
  <div class="main">
    <div class="content-box">
      <div class="title">
        <el-input
          style="width:180px;margin-left:0px;"
          placeholder="订单号 | 手机号"
          v-model="userOrNum"
        ></el-input>

        <el-button
          @click="searchData"
          type="primary"
          style="margin-left:0px;"
          icon="el-icon-search"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="content-box">
      <el-table
        v-loading="loading"
        border
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="ordernumber"
          label="订单号"
          align="center"
          min-width="90"
        ></el-table-column>

        <el-table-column
          prop="chargeStatus"
          label="充电状态"
          align="center"
          min-width="80"
        ></el-table-column>
        <el-table-column
          prop="orderstate"
          label="订单状态"
          align="center"
          min-width="80"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          align="center"
          label="手机号"
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="parkId"
          label="充电桩编号"
          align="center"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="portName"
          label="端口"
          align="center"
          min-width="60"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="realHour"
          label="充电时长"
          align="center"
          min-width="80"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.realHour }}h</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderGold"
          label="订单金额"
          align="center"
          min-width="80"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <div class="editCell">
              <el-button @click="detailHandler(scope.row)">详情</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getOrderList } from '@/api/order';

export default {
  data() {
    return {
      tableData: [],
      cardNo: this.$route.query.cardNo || '',
      page: 1,
      pageSize: 5,//页面数据条数
      loading: true,
      total: 0,
      userOrNum: ''
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    searchData() {
      this.page = 1;
      this.getDataList();
    },
    getDataList() {
      this.loading = true;
      let param = {
        userOrNum: this.userOrNum,
        portCode: this.portCode || '', // 如果有使用portCode，请确保它也有默认值或在data中定义
        cardNo: this.cardNo,
        pageNo: this.page,
        pageSize: this.pageSize,
      };
      getOrderList(param).then(res => {
        if (!res || res.status !== 200) {
          console.error('Invalid response status:', res);
          this.loading = false;
          return;
        }

        if (res.data && res.data.records && res.data.total) {
          this.tableData = [...res.data.records];
          this.total = res.data.total;
        } else {
          console.error('Invalid response data format:', res);
        }
        this.loading = false;
      }).catch(error => {
        console.error('Request failed:', error);
        this.loading = false;
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getDataList();
    },
    detailHandler(row) {
      console.log('点击了订单详情:', row);
      // 这里可以添加弹出详情窗口或其他处理逻辑
    },
  }
};
</script>

<style scoped lang="scss">
// 样式定义
</style>