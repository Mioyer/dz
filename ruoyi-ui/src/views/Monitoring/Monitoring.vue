<template>
    <div class="monitoring-page">
      <header class="page-header">
        <h1>实时监控</h1>
        <p></p>
        <h2>XXX充电站</h2>
      </header>
      <div class="card-container">
        <CardComponent
          v-for="n in 10"
          :key="n"
          :cardId="'11010200000124' + n"
          :iconSrc="require('@/assets/dz1.jpg')"
          :current="0.00"
          :voltage="0.00"
          :power="0"
          :chargeTimes="0"
          :chargeDuration="0"
          :chargeAmount="0"
          :statusClass="'status-' + (n % 3)"
          :statusText="n % 3 === 0 ? '离线' : n % 3 === 1 ? '在线' : '故障'"
        />
      </div>
    </div>
  </template>
  
  <script>
  import CardComponent from '@/components/CardComponent/CardComponent.vue'
  
  export default {
    name: 'MonitoringPage',
    components: {
      CardComponent
    }
  }
  </script>
  
  <style scoped>
  .monitoring-page {
    padding: 20px;
  }
  
  .page-header {
    text-align: left;
    margin-bottom: 20px;
  }
  
  .page-header h1 {
    font-size: 24px;
    margin: 0;
    color: #333;
  }
  
  .page-header h2 {
    font-size: 18px;
    margin: 0;
    color: #666;
  }
  
  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 24px; /* 增加卡片之间的间距 */
    justify-content: flex-start; /* 从左开始排列 */
  }
  
  /* 状态类 */
  .status-0 {
    border: 2px solid red;
  }
  
  .status-1 {
    border: 2px solid green;
  }
  
  .status-2 {
    border: 2px solid orange;
  }
  </style>