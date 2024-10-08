// rule.js
export function getRuleList(data) {
    const list = [
        { id: 1, changeName: '规则一', realName: '张三', isSysGive: 1, isGive: 1, createtime: '2024-01-01' },
        { id: 2, changeName: '规则二', realName: '李四', isSysGive: 0, isGive: 0, createtime: '2024-02-02' },
        { id: 3, changeName: '规则三', realName: '王五', isSysGive: 1, isGive: 0, createtime: '2024-03-03' },
        { id: 4, changeName: '规则四', realName: '赵六', isSysGive: 0, isGive: 1, createtime: '2024-04-04' },
        { id: 5, changeName: '规则五', realName: '孙七', isSysGive: 1, isGive: 1, createtime: '2024-05-05' },
        { id: 6, changeName: '规则六', realName: '周八', isSysGive: 0, isGive: 0, createtime: '2024-06-06' },
        { id: 7, changeName: '规则七', realName: '吴九', isSysGive: 1, isGive: 0, createtime: '2024-07-07' },
        { id: 8, changeName: '规则八', realName: '郑十', isSysGive: 0, isGive: 1, createtime: '2024-08-08' },
        { id: 9, changeName: '规则九', realName: '陈十一', isSysGive: 1, isGive: 1, createtime: '2024-09-09' },
        { id: 10, changeName: '规则十', realName: '黄十二', isSysGive: 0, isGive: 0, createtime: '2024-10-10' },
        { id: 11, changeName: '规则十一', realName: '刘十三', isSysGive: 1, isGive: 0, createtime: '2024-11-11' },
        { id: 12, changeName: '规则十二', realName: '林十四', isSysGive: 0, isGive: 1, createtime: '2024-12-12' },
        { id: 13, changeName: '规则十三', realName: '杨十五', isSysGive: 1, isGive: 1, createtime: '2025-01-13' },
        { id: 14, changeName: '规则十四', realName: '朱十六', isSysGive: 0, isGive: 0, createtime: '2025-02-14' },
        { id: 15, changeName: '规则十五', realName: '谢十七', isSysGive: 1, isGive: 0, createtime: '2025-03-15' },
        { id: 16, changeName: '规则十六', realName: '许十八', isSysGive: 0, isGive: 1, createtime: '2025-04-16' },
        { id: 17, changeName: '规则十七', realName: '冯十九', isSysGive: 1, isGive: 1, createtime: '2025-05-17' },
        { id: 18, changeName: '规则十八', realName: '沈二十', isSysGive: 0, isGive: 0, createtime: '2025-06-18' },
        { id: 19, changeName: '规则十九', realName: '韩二十一', isSysGive: 1, isGive: 0, createtime: '2025-07-19' },
        { id: 20, changeName: '规则二十', realName: '杜二十二', isSysGive: 0, isGive: 1, createtime: '2025-08-20' },
        { id: 21, changeName: '规则二十一', realName: '柳二十三', isSysGive: 1, isGive: 1, createtime: '2025-09-21' },
        { id: 22, changeName: '规则二十二', realName: '邓二十四', isSysGive: 0, isGive: 0, createtime: '2025-10-22' },
        { id: 23, changeName: '规则二十三', realName: '萧二十五', isSysGive: 1, isGive: 0, createtime: '2025-11-23' },
        { id: 24, changeName: '规则二十四', realName: '白二十六', isSysGive: 0, isGive: 1, createtime: '2025-12-24' },
        { id: 25, changeName: '规则二十五', realName: '曹二十七', isSysGive: 1, isGive: 1, createtime: '2026-01-25' },
    
    ];

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