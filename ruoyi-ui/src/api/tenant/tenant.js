function generateRandomTenantData(num) {
  const tenants = [];
  const mobilePrefix = '13800000000'; // 手机号码前缀

  for (let i = 0; i < num; i++) {
    const tenantId = `tenant${i + 1}`;
    const contactPhone = `${mobilePrefix}${String(i).padStart(7, '0')}`; // 保证手机号格式正确
    const companyName = `企业${i + 1}`;
    const creditCode = `${Math.random().toString().slice(2, 20)}`; // 随机生成社会信用代码
    const expiryDate = `2025-12-${String((i % 30) + 1).padStart(2, '0')}`; // 到期日期格式化
    const tenantStatus = Math.random() > 0.3 ? 1 : 0; // 默认状态为1（启用）

    tenants.push({
      tenantId,
      contactPhone,
      companyName,
      creditCode,
      expiryDate,
      tenantStatus,
    });
  }
  return tenants;
}

export function getTenantList(data) {
  // 模拟异步操作
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = {
        records: generateRandomTenantData(102), // 生成XX条随机租户数据
        total: 102, // 总条数应与上方数据相同
      };
      // 如果有搜索条件，过滤数据
      if (data.keyWord) {
        mockData.records = mockData.records.filter(record =>
          record.companyName.includes(data.keyWord) ||
          record.contactPhone.includes(data.keyWord) ||
          record.creditCode.includes(data.keyWord)
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
