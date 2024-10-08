// plot.js
const mockData = {
    records: [
      {
        plotName: "站点A",
        address: "北京市海淀区XX街XX号",
        parkCarInfo: "首小时免费，之后每小时5元",
        createTime: "2023-01-01 12:00:00"
      },
      {
        plotName: "站点B",
        address: "上海市浦东新区XX路XX号",
        parkCarInfo: "全天10元",
        createTime: "2023-01-02 12:00:00"
      },
      {
        plotName: "站点C",
        address: "广州市天河区YY大道YY号",
        parkCarInfo: "首两小时免费，之后每小时6元",
        createTime: "2023-01-03 12:00:00"
      },
      {
        plotName: "站点D",
        address: "深圳市南山区ZZ路ZZ号",
        parkCarInfo: "全天15元",
        createTime: "2023-01-04 12:00:00"
      },
      {
        plotName: "站点E",
        address: "成都市武侯区AA街AA号",
        parkCarInfo: "首小时免费，之后每小时7元",
        createTime: "2023-01-05 12:00:00"
      },
      {
        plotName: "站点F",
        address: "杭州市西湖区BB路BB号",
        parkCarInfo: "全天12元",
        createTime: "2023-01-06 12:00:00"
      },
      {
        plotName: "站点G",
        address: "南京市鼓楼区CC街CC号",
        parkCarInfo: "首两小时免费，之后每小时8元",
        createTime: "2023-01-07 12:00:00"
      },
      {
        plotName: "站点H",
        address: "武汉市洪山区DD路DD号",
        parkCarInfo: "全天18元",
        createTime: "2023-01-08 12:00:00"
      },
      {
        plotName: "站点I",
        address: "重庆市渝北区EE街EE号",
        parkCarInfo: "首小时免费，之后每小时9元",
        createTime: "2023-01-09 12:00:00"
      },
      {
        plotName: "站点J",
        address: "西安市雁塔区FF路FF号",
        parkCarInfo: "全天20元",
        createTime: "2023-01-10 12:00:00"
      }
    ],
    total: 2 // 这里应该等于records数组的长度
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