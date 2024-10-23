function generateRandomTenantPackageData(num) {
  const packageNames = [`基础套餐`, `标准套餐`, `高级套餐`, `豪华套餐`];
  const remarks = [
    `此套餐包含基础服务`,
    `此套餐适合中小企业`,
    `此套餐提供全面服务`,
    `此套餐享有优先支持`,
  ];
  const packages = [];
  
  for (let i = 0; i < num; i++) {
    const packageName = packageNames[i % packageNames.length]; // 循环使用套餐名称
    const remark = remarks[i % remarks.length]; // 循环使用备注信息
    const status = Math.random() > 0.3 ? 1 : 0; // 默认状态为1（启用）

    packages.push({
      packageName,
      remarks: remark,
      status,
    });
  }
  return packages;
}

export function getTenantPackages(data) {
  // 模拟异步操作
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = {
        records: generateRandomTenantPackageData(30), // 生成XX条随机套餐数据
        total: 30, // 总条数应与上方数据相同
      };

      // 如果有搜索条件，过滤数据
      if (data.keyWord) {
        mockData.records = mockData.records.filter(record =>
          record.packageName.includes(data.keyWord) ||
          record.remarks.includes(data.keyWord)
        );
        mockData.total = mockData.records.length;
      }
      
      // 如果需要分页，只返回当前页的数据
      if (data.pageNo && data.pageSize) {
        const start = (data.pageNo - 1) * data.pageSize;
        const end = start + data.pageSize;
        mockData.records = mockData.records.slice(start, end);
      }
      
      resolve({ data: mockData });
    }, 500); // 延迟500毫秒以模拟网络延迟
  });
}
