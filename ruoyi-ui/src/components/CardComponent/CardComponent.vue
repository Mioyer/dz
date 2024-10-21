<template>
  <div :class="['card', statusClass]">
    <div class="card-header">
      <div class="icon-container">
        <img :src="iconSrc" alt="Icon" class="card-icon" />
      </div>
    </div>
    <div class="card-id">{{ cardId }}</div>
    <div class="card-body">
      <div class="row">
        <div class="column">
          <div class="label">电流</div>
          <div class="value">{{ current }} A</div>
        </div>
        <div class="column">
          <div class="label">电压</div>
          <div class="value">{{ voltage }} V</div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div class="label">功率</div>
          <div class="value">{{ power }} W</div>
        </div>
        <div class="column">
          <div class="label">充电次数</div>
          <div class="value">{{ chargeTimes }}</div>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <div class="label">充电时长</div>
          <div class="value">{{ chargeDuration }} 分钟</div>
        </div>
        <div class="column">
          <div class="label">充电金额</div>
          <div class="value">{{ chargeAmount }} 元</div>
        </div>
      </div>
    </div>
    <div class="status-bar" :class="statusClass">
      <div class="status-text">{{ statusText }}</div>
    </div>
    <button class="more-button" @click="showModal = true">更多</button>

    <!-- 模态窗 -->
    <div v-if="showModal" class="modal-overlay" @click="showModal = false">
      <div class="modal" @click.stop>
        <h3>电桩编号： {{ cardId }}</h3>
        <p>更改电桩状态:</p>
        <!-- 修改为按钮样式的下拉菜单 -->
        <div class="select-container">
          <select v-model="statusText" @change="updateStatus" class="styled-select">
            <option value="在线">在线</option>
            <option value="故障">故障</option>
            <option value="离线">离线</option>
          </select>
        </div>
        <button class="close-button" @click="showModal = false">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    cardId: String,
    iconSrc: String,
    current: Number,
    voltage: Number,
    power: Number,
    chargeTimes: Number,
    chargeDuration: Number,
    chargeAmount: Number,
    statusClass: String,
    statusText: String
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    updateStatus() {
      this.statusClass = this.getStatusClass(this.statusText);
    },
    getStatusClass(statusText) {
      if (statusText === '在线') {
        return 'status-online';
      } else if (statusText === '故障') {
        return 'status-error';
      } else if (statusText === '离线') {
        return 'status-offline';
      }
    }
  },
  mounted() {
    this.statusClass = this.getStatusClass(this.statusText);
  }
}
</script>

<style scoped>
.card {
  background-color: #f0f0f0; /* 统一浅灰色背景 */
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  color: #3e3e3e;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 200px;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
  margin-bottom: 16px; /* 增加底部间距 */
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

/* 模态窗的下拉菜单按钮样式 */
.select-container {
  margin-top: 10px;
}

.styled-select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  border: none;
  appearance: none; /* 移除默认箭头 */
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.styled-select:hover {
  background-color: #0056b3;
}

.styled-select:focus {
  outline: none;
  box-shadow: 0 0 3px 2px rgba(0, 123, 255, 0.5);
}

.styled-select::after {
  content: '▼'; /* 模拟下拉箭头 */
  position: absolute;
  right: 10px;
  top: calc(50% - 8px);
}

.card-header {
  text-align: center;
  margin-bottom: 10px;
}

.card-id {
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

.icon-container {
  position: relative;
}

.card-icon {
  width: 160px; /* 图片宽度 */
  height: 180px; /* 图片高度 */
  object-fit: cover; /* 保持图片比例并填充整个容器 */
  margin-bottom: 10px; /* 图片与编号之间的间距 */
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.label {
  font-size: 12px;
  color: #bcbec2;
}

.value {
  font-size: 16px;
  font-weight: bold;
}

.status-bar {
  text-align: center;
  padding-top: 10px;
  border-top: 1px solid #dfe6ed;
}

.status-text {
  font-size: 14px;
  font-weight: bold;
}

.more-button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
}

.more-button:hover {
  background-color: #0056b3;
}

/* 模态窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
  z-index: 1001;
}

.close-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #0056b3;
}
</style>
