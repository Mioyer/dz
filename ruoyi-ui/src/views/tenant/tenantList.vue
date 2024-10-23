<template>
  <div class="main">
    <!-- 搜索框 -->
    <div class="content-box">
      <el-input
        maxlength="15"
        style="width:350px;"
        placeholder="企业名称\联系电话\社会信用代码"
        v-model="search"
      >
        <el-button
          slot="suffix"
          @click="getDataList"
          type="primary"
          icon="el-icon-search"
          style="border-radius:0 4px 4px 0;margin-right:-5px"
        >搜索</el-button>
      </el-input>
    </div>
    <!-- 表格 -->
    <div class="content-box">
      <el-table
        v-loading="loading"
        border
        :data="tableData"
        :row-class-name="rowClassName"
        style="width: 100%"
      >
        <!-- 表格列定义 -->
        <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
        <el-table-column prop="tenantId" label="租户编号" align="center" min-width="100"></el-table-column>
        <el-table-column prop="contactPhone" label="联系电话" align="center" min-width="150"></el-table-column>
        <el-table-column prop="companyName" label="企业名称" align="center" min-width="160"></el-table-column>
        <el-table-column prop="creditCode" label="社会信用代码" align="center" min-width="180"></el-table-column>
        <el-table-column prop="expiryDate" label="过期时间" align="center" min-width="160"></el-table-column>
        <el-table-column prop="tenantStatus" label="租户状态" align="center" min-width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.tenantStatus"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
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
import { getTenantList } from "@/api/tenant/tenant";

export default {
  data() {
    return {
      search: "",
      tableData: [],
      page: 1,
      pageSize: 17,
      loading: true,
      total: 0,
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      this.loading = true;
      const param = {
        keyWord: this.search,
        pageNo: this.page,
        pageSize: this.pageSize,
      };
      getTenantList(param).then((res) => {
        if (res.data.records && res.data.records.length >= 0) {
          this.tableData = [...res.data.records];
          this.total = res.data.total;
        }
        this.loading = false;
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getDataList();
    },
    rowClassName({ row }) {
      return row.tenantStatus === 0 ? 'inactive-row' : '';
    },
  },
};
</script>

<style scoped>
.title {
  margin-left: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}
.data {
  margin-left: 20px;
  margin-top: 20px;
  margin-right: 10px;
}
.el-table>>> .inactive-row {
  background-color: #f9ebeb;
}
</style>
