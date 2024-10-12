import request from '@/utils/request';

// 随机生成充电桩数据
function generateRandomChargingPileData(num) {
  const pileTypes = ['快充', '慢充'];
  const plotNames = ['科技园区', '商业中心', '工业园区', '大学城', '公园广场', '居民小区', '购物中心', '火车站', '机场', '医院'];
  const realNames = ['华天科技有限公司', '光大集团', '东风汽车公司', '北京大学', '城市绿化局', '幸福社区管理处', '万达集团', '铁路局', '国际机场管理局', '市立医院'];
  
  const list = [];
  
  for (let i = 0; i < num; i++) {
      const id = (1001 + i).toString(); // 生成ID
      const pileTypeIndex = Math.floor(Math.random() * 2); // 随机选择充电桩类型
      const pileType = pileTypeIndex === 0 ? 1 : 0; // 1为快充，0为慢充
      const pileStatus = Math.round(Math.random()); // 随机0或1（禁用或启用）
      const runningStatus = Math.round(Math.random()); // 随机0或1（运行或离线）
      const totalPowerConsumption = `${Math.floor(Math.random() * 300 + 100)}kWh`; // 随机生成100-400kWh的总功耗

      list.push({
          id: id,
          pkname: `充电桩${String.fromCharCode(65 + (i % 26))}`, // 确保只生成A-J
          pileType: pileType,
          plotName: plotNames[Math.floor(Math.random() * plotNames.length)],
          realName: realNames[Math.floor(Math.random() * realNames.length)],
          pileStatus: pileStatus,
          runningStatus: runningStatus,
          totalPowerConsumption: totalPowerConsumption
      });
  }
  
  return list;
}

const mockChargingPileList = generateRandomChargingPileData(102); // 生成xx条模拟数据

export function getChargingPileList(data) {
  // 模拟异步操作
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredList = mockChargingPileList.filter(item => {
        // 根据关键字过滤数据
        const keyword = data.keyWord.toLowerCase();
        return item.id.includes(keyword) || 
               item.pkname.toLowerCase().includes(keyword) || 
               item.plotName.toLowerCase().includes(keyword);
      });

      const start = (data.pageNo - 1) * data.pageSize;
      const end = start + data.pageSize;

      resolve({
        data: {
          records: filteredList.slice(start, end),
          total: filteredList.length
        }
      });
    }, 500); 
  });
}
