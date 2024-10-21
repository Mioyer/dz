<template>
  <div class="main">
    <div class="content-box">
      <div class="title">
        <el-input maxlength="10" style="width:260px; margin-left:0px;" placeholder="搜索规则名称" v-model="search">
          <el-button slot="suffix" @click="searchData" type="primary" icon="el-icon-search"
            style="border-radius:0 4px 4px 0; margin-right:-5px">搜索</el-button>
        </el-input>
      </div>
    </div>
    <div class="content-box">
      <el-table v-loading="loading" border :data="tableData" :row-class-name="rowClassName" style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
        <el-table-column prop="changeName" label="规则名称" align="center" min-width="120"
          :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="realName" label="代理商姓名" align="center" min-width="100"
          :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="isSysGive" :formatter="isSysGive" label="平台默认" align="center"
          min-width="120"></el-table-column>
        <el-table-column prop="isGive" :formatter="isGive" label="代理商默认" align="center"
          min-width="120"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" align="center" min-width="120"></el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" :current-page="page" :page-size="pageSize"
        :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
import { getRuleList } from '@/api/rule';

export default {
  data() {
    return {
      search: '',
      tableData: [],
      loading: true,
      total: 0,
      page: 1,
      pageSize: 17, // 默认每页展示XX条记录
      operatorId: '' // 示例中未使用，可根据需要设置
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getDataList();
    },
    isGive(row) {
      return row.isGive === 1 ? '默认' : '否';
    },
    isSysGive(row) {
      return row.isSysGive === 1 ? '默认' : '否';
    },
    searchData() {
      // console.log('搜索条件:', this.search); // 输出搜索条件
      this.page = 1; // 重置页码
      this.getDataList(); // 重新获取数据
    },
    getDataList() {
      this.loading = true;
      getRuleList({
        userId: this.operatorId,
        ruleNm: this.search, // 传递搜索条件
        deviceType: 4,
        pageNo: this.page,
        pageSize: this.pageSize,
      }).then(res => {
        // console.log('模拟数据:', res); // 输出模拟数据
        if (res && res.code === 200) {
          this.tableData = res.records || []; // 替换数据
          this.total = res.total || 0;
        }
        this.loading = false;
      }).catch(error => {
        console.error('请求失败:', error);
        this.loading = false;
      });
    },

    rowClassName({ row }) {
      return row.isGive === 0 ? 'red-row' : '';
    }
  },

};
</script>

<style scoped>
.error_input {
  border: 1px solid #f56c6c;
  border-radius: 4px;
}

.tipmincc {
  color: #3b99ed;
  font-size: 12px;
}

.el-table>>>.red-row {
  background-color: #f9ebeb;
  /* 红色背景 */
}
</style>