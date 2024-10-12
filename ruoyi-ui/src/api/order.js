function generateRandomOrderData(num) {
    const chargeStatuses = ['完成', '进行中', '取消'];
    const orderStates = ['已完成', '未完成', '已取消'];
    const mobilePrefix = '138';
    const parkIds = ['CP001', 'CP002', 'CP003', 'CP004', 'CP005', 'CP006', 'CP007', 'CP008', 'CP009', 'CP010'];
    const portNames = ['A01', 'B02', 'C03', 'D04', 'E05', 'F06', 'G07', 'H08', 'I09', 'J10'];

    const orders = [];
    for (let i = 1; i <= num; i++) {
        const ordernumber = `ORD${String(i).padStart(3, '0')}`;
        const chargeStatus = chargeStatuses[Math.floor(Math.random() * chargeStatuses.length)];
        const orderstate = orderStates[Math.floor(Math.random() * orderStates.length)];
        const mobile = `${mobilePrefix}${String(Math.floor(Math.random() * 10000000)).padStart(7, '0')}`;
        const parkId = parkIds[Math.floor(Math.random() * parkIds.length)];
        const portName = portNames[Math.floor(Math.random() * portNames.length)];
        const realHour = (Math.random() * 5).toFixed(2); // 随机生成 0 到 5 小时
        const orderGold = (realHour * 25).toFixed(2); // 假设每小时收费25元
        const cardNo = `CARD${String(i).padStart(3, '0')}`;

        orders.push({
            ordernumber,
            chargeStatus,
            orderstate,
            mobile,
            parkId,
            portName,
            realHour,
            orderGold,
            cardNo
        });
    }
    return orders;
}

export function getOrderList(data) {
    // 生成模拟数据
    const mockData = {
        status: 200,
        data: {
            records: generateRandomOrderData(102), // 生成XX条随机订单数据
            total: 102 // 应与上方数据相同
        },
    };

    // 过滤数据
    if (data.userOrNum) {
        const searchValue = String(data.userOrNum).toLowerCase();
        mockData.data.records = mockData.data.records.filter(record => {
            const ordernumber = record.ordernumber ? record.ordernumber.toLowerCase() : '';
            const mobile = record.mobile ? record.mobile.toLowerCase() : '';
            const cardNo = record.cardNo ? record.cardNo.toLowerCase() : '';

            return (
                ordernumber.includes(searchValue) ||
                mobile.includes(searchValue) ||
                cardNo.includes(searchValue)
            );
        });

        // 更新总记录数
        mockData.data.total = mockData.data.records.length;
    }

    // 分页逻辑
    const pageNo = data.pageNo || 1;
    const pageSize = data.pageSize || 10;
    const start = (pageNo - 1) * pageSize;
    const end = start + pageSize;

    mockData.data.records = mockData.data.records.slice(start, end);

    return new Promise((resolve) => {
        setTimeout(() => resolve(mockData), 500); // 模拟网络延迟
    });
}
