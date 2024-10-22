<template>
  <div class="monitoring-page">
    <header class="page-header">
      <h1>实时监控</h1>
      <div class="site-selector">
        <!-- ElementUI 下拉选择站点 -->
        <el-select v-model="selectedSite" placeholder="请选择站点" @change="onSiteChange">
          <el-option v-for="(value, key) in siteList" :key="key" :label="key" :value="key" />
        </el-select>
      </div>
    </header>
    
    <!-- 卡片容器 -->
    <div class="card-container">
      <CardComponent
        v-for="(card, index) in currentSiteData"
        :key="card.cardId"
        :cardId="card.cardId"
        :iconSrc="card.iconSrc"
        :current="card.current"
        :voltage="card.voltage"
        :power="card.power"
        :chargeTimes="card.chargeTimes"
        :chargeDuration="card.chargeDuration"
        :chargeAmount="card.chargeAmount"
        :statusText="card.statusText"
        :statusClass="getStatusClass(card.statusText)"
      />
    </div>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent/CardComponent.vue';
import { siteData } from '@/api/monitor';

export default {
  name: 'MonitoringPage',
  components: {
    CardComponent
  },
  data() {
    return {
      selectedSite: '站点A', // 默认选中站点A
      siteList: siteData,
      currentSiteData: siteData['站点A'] // 当前站点的电桩数据
    };
  },
  methods: {
    onSiteChange() {
      // 切换站点时，更新当前站点的数据
      this.currentSiteData = this.siteList[this.selectedSite];
    },
    getStatusClass(statusText) {
      // 根据电桩状态返回不同的边框颜色类
      if (statusText === '在线') {
        return 'status-online';
      } else if (statusText === '故障') {
        return 'status-error';
      } else if (statusText === '离线') {
        return 'status-offline';
      }
    }
  }
};
</script>

<style scoped>
.monitoring-page {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h1 {
  font-size: 24px;
  margin: 0;
  color: #333;
}

.site-selector {
  width: 200px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: flex-start;
}

/* 状态类 */
.status-online {
  border-color: green;
}

.status-error {
  border-color: red;
}

.status-offline {
  border-color: gray;
}
</style>
