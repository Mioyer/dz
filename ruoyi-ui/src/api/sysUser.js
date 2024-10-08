// src/api/sysUser.js

export function getUserList(data) {
    // 模拟异步操作
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = {
          records: [],
          total: 100, // 假设有100条记录
        };
  
        // 生成100条模拟数据
        for (let i = 0; i < 100; i++) {
          const useraccount = `user${i + 1}`;
          const realName = `用户${i + 1}`;
          const mobile = `1380000000${i}`;
          const createtime = `2024-10-${(i % 30) + 1}`;
          const rolesArr = i % 2 === 0 ? ['管理员'] : ['普通用户'];
          const state = i % 2 === 0 ? 1 : 0;
  
          mockData.records.push({
            useraccount,
            realName,
            mobile,
            createtime,
            rolesArr,
            state,
          });
        }
  
        // 如果有搜索条件，过滤数据
        if (data.keyWord) {
          mockData.records = mockData.records.filter(record =>
            record.useraccount.includes(data.keyWord) ||
            record.realName.includes(data.keyWord) ||
            record.mobile.includes(data.keyWord)
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