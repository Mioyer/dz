// statistics.js
function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomAmount(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function generatePastDates(days) {
  const dates = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]); // 获取 YYYY-MM-DD 格式的日期
  }
  return dates;
}

// Data fetching functions
export function getUsersAndSales() {
  return {
    data: {
      sumSales: generateRandomAmount(10000, 50000),
      sumCount: generateRandomInt(100, 500),
      reSales: generateRandomAmount(1000, 5000)
    }
  };
}

export function getNewUserCount() {
  return {
    data: {
      newUserCount: generateRandomInt(50, 200)
    }
  };
}

export function getPilesInfo() {
  return {
    data: {
      total: generateRandomInt(10, 50)
    }
  };
}

export function getDayRecharge() {
  return {
    data: {
      dayRecharge: generateRandomAmount(1000, 5000)
    }
  };
}

export function getManageTotalData() {
  return {
    data: {
      plotList: generateRandomInt(20, 100),
      deviceList: generateRandomInt(50, 200),
      totalPowerConsumption: generateRandomAmount(1000, 5000),
      onLine: generateRandomInt(30, 80),
      offLine: generateRandomInt(10, 30)
    }
  };
}

export function getSalesData() {
  const records = generatePastDates(15).map(date => ({
    createTime: date,
    orderCount: generateRandomInt(10, 100),
    validOrderCount: generateRandomInt(5, 30),
    salesTotal: generateRandomAmount(1000, 5000),
    refundTotal: generateRandomAmount(100, 500),
    refundOrderCount: generateRandomInt(0, 10)
  }));
  return { data: { records } };
}

export function getRechargeAndRefundByDays() {
  const records = generatePastDates(15).map(date => ({
    date,
    rechargeAmount: generateRandomAmount(1000, 5000),
    refundAmount: generateRandomAmount(100, 500)
  }));
  return { data: { records } };
}

export function getDeviceStatistics() {
  const deviceStatus = {
    using: generateRandomInt(50, 100),
    faulty: generateRandomInt(10, 50),
    idle: generateRandomInt(20, 80)
  };

  const faultReasons = {
    overTempAlert: generateRandomInt(20, 50),
    plugDamaged: generateRandomInt(15, 30),
    contactorFault: generateRandomInt(10, 25),
    gunDamage: generateRandomInt(5, 20),
    offline: generateRandomInt(10, 30),
    powerOff: generateRandomInt(5, 15)
  };

  return {
    data: {
      deviceStatus,
      faultReasons
    }
  };
}

// Generate past 15 days' dates for console logging
const past15Days = generatePastDates(15);
console.log(past15Days);

function generateQuarterlyData() {
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  const records = quarters.map(quarter => ({
    quarter,
    rechargeAmount: generateRandomAmount(10000, 50000),
    refundAmount: generateRandomAmount(1000, 5000),
  }));
  return { data: { records } };
}

export function getQuarterlyRechargeAndRefund() {
  return generateQuarterlyData();
}
