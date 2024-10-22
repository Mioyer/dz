// monitor.js
export const siteData = {
    '站点A': Array.from({ length: 10 }, (_, index) => ({
      cardId: `11010200000124${index + 1}`,
      iconSrc: require('@/assets/dz1.jpg'),
      current: (Math.random() * 10).toFixed(2),
      voltage: (Math.random() * 220).toFixed(2),
      power: Math.floor(Math.random() * 5000),
      chargeTimes: Math.floor(Math.random() * 100),
      chargeDuration: Math.floor(Math.random() * 300),
      chargeAmount: Math.floor(Math.random() * 100),
      statusText: ['在线', '故障', '离线'][Math.floor(Math.random() * 3)]
    })),
    
    '站点B': Array.from({ length: 12 }, (_, index) => ({
      cardId: `11010200000234${index + 1}`,
      iconSrc: require('@/assets/dz2.jpg'),
      current: (Math.random() * 10).toFixed(2),
      voltage: (Math.random() * 220).toFixed(2),
      power: Math.floor(Math.random() * 5000),
      chargeTimes: Math.floor(Math.random() * 100),
      chargeDuration: Math.floor(Math.random() * 300),
      chargeAmount: Math.floor(Math.random() * 100),
      statusText: ['在线', '故障', '离线'][Math.floor(Math.random() * 3)]
    }))
  };
  