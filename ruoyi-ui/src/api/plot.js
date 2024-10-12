// plot.js

function getRandomDate(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  return randomDate.toISOString().slice(0, 19).replace('T', ' '); // 格式化为 "YYYY-MM-DD HH:mm:ss"
}

function generateRandomPlotData(num) {
  const plotNames = ["站点A", "站点B", "站点C", "站点D", "站点E", "站点F", "站点G", "站点H", "站点I", "站点J"];
  const addresses = [
      "北京市海淀区XX街XX号",
      "上海市浦东新区XX路XX号",
      "广州市天河区YY大道YY号",
      "深圳市南山区ZZ路ZZ号",
      "成都市武侯区AA街AA号",
      "杭州市西湖区BB路BB号",
      "南京市鼓楼区CC街CC号",
      "武汉市洪山区DD路DD号",
      "重庆市渝北区EE街EE号",
      "西安市雁塔区FF路FF号"
  ];
  const parkCarInfos = [
      "首小时免费，之后每小时5元",
      "全天10元",
      "首两小时免费，之后每小时6元",
      "全天15元",
      "首小时免费，之后每小时7元",
      "全天12元",
      "首两小时免费，之后每小时8元",
      "全天18元",
      "首小时免费，之后每小时9元",
      "全天20元"
  ];

  const list = [];
  for (let i = 0; i < num; i++) {
      const plotIndex = Math.floor(Math.random() * plotNames.length);
      const addressIndex = Math.floor(Math.random() * addresses.length);
      const parkCarInfoIndex = Math.floor(Math.random() * parkCarInfos.length);
      
      // 随机生成时间
      const createTime = getRandomDate('2021-01-01', '2024-12-31'); // 在2022年到2023年之间生成随机日期

      list.push({
          plotName: plotNames[plotIndex],
          address: addresses[addressIndex],
          parkCarInfo: parkCarInfos[parkCarInfoIndex],
          createTime: createTime
      });
  }
  return list;
}

const mockData = {
  records: generateRandomPlotData(102) // 生成xx条模拟数据
};

export function getPlotList(data) {
  return new Promise((resolve) => {
      setTimeout(() => {
          // 模拟数据过滤
          const filteredData = mockData.records.filter(record =>
              record.plotName.includes(data.keyWord) ||
              record.address.includes(data.keyWord) ||
              record.parkCarInfo.includes(data.keyWord)
          );

          // 返回过滤后的数据
          resolve({
              data: {
                  records: filteredData.slice((data.pageNo - 1) * data.pageSize, data.pageNo * data.pageSize),
                  total: filteredData.length
              }
          });
      }, 500); // 模拟网络请求延时
  });
}
