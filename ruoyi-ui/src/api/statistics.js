// import request from '@/utils/request'
// //Statistics/getUsersAndSales
// const baseService = '/jingli-admin';
// export function getUsersAndSales(data) {
//     return request({
//         url: baseService + '/Statistics/getUsersAndSales',
//         method: 'get',
//         params: data

//     })
// }

// // Statistics/getSalesDetail
// export function getSalesDetail(data) {
//     return request({
//         url: baseService + '/Statistics/getSalesDetail',
//         method: 'get',
//         params: data

//     })
// }

// ///Statistics/getSalesData
// export function getSalesData(data) {
//     return request({
//         url: baseService + '/Statistics/getSalesData',
//         method: 'get',
//         params: data

//     })
// }

// ///Statistics/getNewUserCount
// export function getNewUserCount(data) {
//     return request({
//         url: baseService + '/Statistics/getNewUserCount',
//         method: 'get',
//         params: data

//     })
// }

// // Statistics/getPilesInfo
// export function getPilesInfo(data) {
//     return request({
//         url: baseService + '/Statistics/getPilesInfo',
//         method: 'get',
//         params: data
//     })
// }

// // Statistics/getDayRecharge
// export function getDayRecharge(data) {
//     return request({
//         url: baseService + '/Statistics/getDayRecharge',
//         method: 'get',
//         params: data
//     })
// }

// export function getManageTotalData(data) {
//     return request({
//         url: baseService + '/Statistics/getManageTotalData',
//         method: 'post',
//         data: data

//     })
// }
// statistics.js



// 模拟数据生成函数
function generateRandomAmount(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 模拟用户和销售数据
export function getUsersAndSales(data) {
  const userCount = generateRandomInt(500, 1000); // 随机生成的用户数
  const salesAmount = generateRandomAmount(50000, 100000); // 随机生成的交易额
  return Promise.resolve({
    code: 200,
    data: {
      userCount,
      salesAmount
    }
  });
}

// 模拟新用户数量
export function getNewUserCount(data) {
  const newUserCount = generateRandomInt(50, 200); // 随机生成的新用户数
  return Promise.resolve({
    code: 200,
    data: {
      newUserCount
    }
  });
}

// 模拟总站点数
export function getPilesInfo(data) {
  const totalPlots = generateRandomInt(10, 50); // 随机生成的总站点数
  return Promise.resolve({
    code: 200,
    data: {
      total: totalPlots
    }
  });
}

// 模拟每日充值数据
export function getDayRecharge(data) {
  const dayRecharge = generateRandomAmount(1000, 10000); // 随机生成的每日充值金额
  return Promise.resolve({
    code: 200,
    data: {
      dayRecharge
    }
  });
}

// 模拟管理总数据
export function getManageTotalData(data) {
  const totalSales = generateRandomAmount(100000, 500000); // 随机生成的总销售额
  const totalUsers = generateRandomInt(1000, 5000); // 随机生成的总用户数
  const totalPiles = generateRandomInt(50, 200); // 随机生成的总设备数
  return Promise.resolve({
    code: 200,
    data: {
      totalSales,
      totalUsers,
      totalPiles
    }
  });
}

// 模拟销售数据
export function getSalesData(data) {
  const records = Array.from({ length: 7 }, () => ({
    sumCount: generateRandomInt(100, 500), // 随机生成的订单数
    validCount: generateRandomInt(80, 400), // 随机生成的有效订单数
    sumSales: generateRandomAmount(10000, 20000), // 随机生成的销售总额
    reSales: generateRandomAmount(500, 2000), // 随机生成的退款金额
    reCount: generateRandomInt(10, 50), // 随机生成的退款次数
    createTime: new Date().toISOString() // 当前时间
  }));
  return Promise.resolve({
    code: 200,
    data: {
      records
    }
  });
}

// 模拟总充电量
export function getTotalPowerConsumption(data) {
  const totalPowerConsumption = generateRandomAmount(1000, 5000); // 随机生成的总充电量
  return Promise.resolve({
    code: 200,
    data: {
      totalPowerConsumption
    }
  });
}

// 模拟在线设备数量
export function getOnlineDevices(data) {
  const onLine = generateRandomInt(100, 300); // 随机生成的在线设备数
  return Promise.resolve({
    code: 200,
    data: {
      onLine
    }
  });
}

// 模拟离线设备数量
export function getOfflineDevices(data) {
  const offLine = generateRandomInt(50, 150); // 随机生成的离线设备数
  return Promise.resolve({
    code: 200,
    data: {
      offLine
    }
  });
}

// 新增：模拟每日退款金额
export function getDailyRefundAmount(data) {
  const dailyRefundAmount = generateRandomAmount(100, 1000); // 随机生成的每日退款金额
  return Promise.resolve({
    code: 200,
    data: {
      dailyRefundAmount
    }
  });
}

// 模拟多天的充值和退款数据
export function getRechargeAndRefundByDays(data) {
  const days = 7; // 假设我们需要一周的数据
  const records = Array.from({ length: days }, (_, index) => ({
    date: new Date(new Date().setDate(new Date().getDate() - index)).toISOString().split('T')[0], // 当前日期往前推index天
    rechargeAmount: generateRandomAmount(1000, 10000), // 随机生成的每日充值金额
    refundAmount: generateRandomAmount(500, 2000) // 随机生成的每日退款金额
  }));

  return Promise.resolve({
    code: 200,
    data: {
      records
    }
  });
}