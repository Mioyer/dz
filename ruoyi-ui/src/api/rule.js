// rule.js

function generateRandomName() {
    const firstNames = ['张', '李', '王', '赵', '孙', '周', '吴', '郑', '陈', '黄', '刘', '林', '杨', '朱', '谢', '许', '冯', '沈', '韩', '杜', '柳', '邓', '萧', '白', '曹'];
    const lastNames = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '二十一', '二十二', '二十三', '二十四', '二十五', '二十六', '二十七'];
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomFirstName}${randomLastName}`;
}

function getRandomDate(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    return randomDate.toISOString().slice(0, 19).replace('T', ' '); // 格式化为 "YYYY-MM-DD HH:mm:ss"
}

function generateMockData(num) {
    const list = [];
    for (let i = 1; i <= num; i++) {
        const isSysGive = Math.round(Math.random()); // 随机0或1
        const isGive = Math.round(Math.random()); // 随机0或1
        const createtime = getRandomDate('2023-01-01', '2024-12-31'); // 随机生成时间在2023年到2024年之间

        list.push({
            id: i,
            changeName: `规则${i}`,
            realName: generateRandomName(),
            isSysGive: isSysGive,
            isGive: isGive,
            createtime: createtime
        });
    }
    return list;
}

export function getRuleList(data) {
    const list = generateMockData(102); // 生成102条模拟数据

    // 过滤逻辑
    let filteredList = list;
    if (data.ruleNm) {
        filteredList = list.filter(item => item.changeName.includes(data.ruleNm));
    }

    // 分页逻辑
    const startIndex = (data.pageNo - 1) * data.pageSize;
    const endIndex = startIndex + data.pageSize;
    const paginatedList = filteredList.slice(startIndex, endIndex);

    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                code: 200,
                msg: '查询成功',
                records: paginatedList,
                total: filteredList.length
            });
        }, 500);
    });
}
