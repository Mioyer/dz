function generateRandomUserData(num) {
    const roles = ['管理员', '普通用户', '超级管理员'];
    const users = [];
    const mobilePrefix = '13800000000'; // 手机号码前缀
    for (let i = 0; i < num; i++) {
      const useraccount = `user${i + 1}`;
      const realName = `用户${i + 1}`;
      const mobile = `${mobilePrefix}${String(i).padStart(7, '0')}`; // 保证手机号格式正确
      const createtime = `2024-10-${String((i % 30) + 1).padStart(2, '0')}`; // 日期格式化
      const rolesArr = [roles[Math.floor(Math.random() * roles.length)]]; // 随机角色 
      const state = Math.random() > 0.3 ? 1 : 0// 默认状态为1（启用）
      users.push({
        useraccount,
        realName,
        mobile,
        createtime,
        rolesArr,
        state,
      });
    }
    return users;
  }
  
  export function getUserList(data) {
    // 模拟异步操作
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = {
          records: generateRandomUserData(102), // 生成XX条随机用户数据
          total: 102, // 应与上方数据相同
        };
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
  