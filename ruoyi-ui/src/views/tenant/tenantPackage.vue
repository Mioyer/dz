<template>
  <div class="main">
    <!-- 搜索框 -->
    <div class="content-box">
      <el-input
        maxlength="15"
        style="width: 400px;"
        placeholder="搜索套餐名称或备注"
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
        <el-table-column prop="packageName" label="套餐名称" align="center" min-width="150"></el-table-column>
        <el-table-column prop="remarks" label="备注" align="center" min-width="200"></el-table-column>
        <el-table-column prop="status" label="状态" align="center" min-width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="updateStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="120">
          <template slot-scope="scope">
            <el-button @click="editPackage(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deletePackage(scope.row, scope.$index)" type="text" size="small" style="color: red;">删除</el-button>
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

    <!-- 编辑套餐对话框 -->
    <el-dialog :visible.sync="dialogVisible" title="编辑套餐">
      <el-form :model="currentPackage">
        <el-form-item label="套餐名称">
          <el-input v-model="currentPackage.packageName"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="currentPackage.remarks"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePackage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTenantPackages, addTenantPackage } from "@/api/tenant/tenantPackages";

export default {
  data() {
    return {
      search: "",
      tableData: [],
      page: 1,
      pageSize: 10,
      loading: true,
      total: 0,
      dialogVisible: false,
      currentPackage: {},
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
      getTenantPackages(param).then((res) => {
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
      return row.status === 0 ? 'inactive-row' : '';
    },
    editPackage(row) {
      this.currentPackage = { ...row }; // 复制当前行数据
      this.dialogVisible = true; // 显示编辑对话框
    },
    savePackage() {
      // 保存编辑后的套餐数据
      const index = this.tableData.findIndex(pkg => pkg.packageName === this.currentPackage.packageName);
      if (index !== -1) {
        this.$set(this.tableData, index, { ...this.currentPackage }); // 更新套餐数据
      }
      this.dialogVisible = false; // 关闭对话框
    },
    deletePackage(row, index) {
      this.$confirm('确定要删除此套餐吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除套餐数据
        this.tableData.splice(index, 1); // 从当前分页删除套餐
        this.total--; // 更新总数

        // 获取下一个分页的数据并移动第一条数据到当前分页
        const param = {
          keyWord: this.search,
          pageNo: this.page + 1, // 请求下一页的数据
          pageSize: 1, // 只请求一条数据
        };
        getTenantPackages(param).then((res) => {
          if (res.data.records && res.data.records.length > 0) {
            const nextPackage = res.data.records[0];
            this.tableData.push(nextPackage); // 将下一分页的第一条数据添加到当前分页
          }

          // 添加一个新套餐以保持当前分页的数据条数不变
          addTenantPackage().then((newPackage) => {
            this.tableData.push(newPackage); // 向当前分页添加新套餐
            this.total++; // 更新总数
          });

          this.loading = false;
        });

        this.$message({
          type: 'success',
          message: '删除成功! 数据已更新.'
        });
      });
    },
    updateStatus(row) {
      // 更新状态逻辑
      console.log("状态更新:", row);
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
