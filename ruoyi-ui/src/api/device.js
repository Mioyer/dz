import request from '@/utils/request';

// 模拟数据
const mockChargingPileList = [
  {
    id: '1001',
    pkname: '充电桩A',
    pileType: 1, // 快充
    plotName: '科技园区',
    realName: '华天科技有限公司',
    pileStatus: 1, // 启用
    runningStatus: 0, // 运行
    totalPowerConsumption: '200kWh'
  },
  {
    id: '1002',
    pkname: '充电桩B',
    pileType: 0, // 慢充
    plotName: '商业中心',
    realName: '光大集团',
    pileStatus: 1, // 启用
    runningStatus: 1, // 离线
    totalPowerConsumption: '150kWh'
  },
  {
    id: '1003',
    pkname: '充电桩C',
    pileType: 1, // 快充
    plotName: '工业园区',
    realName: '东风汽车公司',
    pileStatus: 1, // 启用
    runningStatus: 0, // 运行
    totalPowerConsumption: '300kWh'
  },
  {
    id: '1004',
    pkname: '充电桩D',
    pileType: 0, // 慢充
    plotName: '大学城',
    realName: '北京大学',
    pileStatus: 0, // 禁用
    runningStatus: 1, // 离线
    totalPowerConsumption: '120kWh'
  },
  {
    id: '1005',
    pkname: '充电桩E',
    pileType: 1, // 快充
    plotName: '公园广场',
    realName: '城市绿化局',
    pileStatus: 1, // 启用
    runningStatus: 0, // 运行
    totalPowerConsumption: '250kWh'
  },
  {
    id: '1006',
    pkname: '充电桩F',
    pileType: 0, // 慢充
    plotName: '居民小区',
    realName: '幸福社区管理处',
    pileStatus: 1, // 启用
    runningStatus: 0, // 运行
    totalPowerConsumption: '180kWh'
  },
  {
    id: '1007',
    pkname: '充电桩G',
    pileType: 1, // 快充
    plotName: '购物中心',
    realName: '万达集团',
    pileStatus: 1, // 启用
    runningStatus: 0, // 运行
    totalPowerConsumption: '220kWh'
  },
  {
    id: '1008',
    pkname: '充电桩H',
    pileType: 0, // 慢充
    plotName: '火车站',
    realName: '铁路局',
    pileStatus: 0, // 禁用
    runningStatus: 1, // 离线
    totalPowerConsumption: '110kWh'
  },
  {
    id: '1009',
    pkname: '充电桩I',
    pileType: 1, // 快充
    plotName: '机场',
    realName: '国际机场管理局',
    pileStatus: 1, // 启用
    runningStatus: 0, // 运行
    totalPowerConsumption: '350kWh'
  },
  {
    id: '1010',
    pkname: '充电桩J',
    pileType: 0, // 慢充
    plotName: '医院',
    realName: '市立医院',
    pileStatus: 1, // 启用
    runningStatus: 0, // 运行
    totalPowerConsumption: '190kWh'
  }
];

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
    }, 500); // 假设请求需要1秒的时间
  });
}