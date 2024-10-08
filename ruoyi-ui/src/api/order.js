
export function getOrderList(data) {
    // 模拟数据
    const mockData = {
        status: 200,
        data: {
            records: [
                { ordernumber: 'ORD001', chargeStatus: '完成', orderstate: '已完成', mobile: '13800138000', parkId: 'CP001', portName: 'A01', realHour: '2', orderGold: '50', cardNo: 'CARD001' },
                { ordernumber: 'ORD002', chargeStatus: '进行中', orderstate: '未完成', mobile: '13800138001', parkId: 'CP002', portName: 'B02', realHour: '1', orderGold: '30', cardNo: 'CARD002' },
                { ordernumber: 'ORD003', chargeStatus: '取消', orderstate: '已取消', mobile: '13800138002', parkId: 'CP003', portName: 'C03', realHour: '0', orderGold: '0', cardNo: 'CARD003' },
                { ordernumber: 'ORD004', chargeStatus: '完成', orderstate: '已完成', mobile: '13800138003', parkId: 'CP004', portName: 'D04', realHour: '3', orderGold: '75', cardNo: 'CARD004' },
                { ordernumber: 'ORD005', chargeStatus: '进行中', orderstate: '未完成', mobile: '13800138004', parkId: 'CP005', portName: 'E05', realHour: '0.5', orderGold: '25', cardNo: 'CARD005' },
                { ordernumber: 'ORD006', chargeStatus: '完成', orderstate: '已完成', mobile: '13800138005', parkId: 'CP006', portName: 'F06', realHour: '1.5', orderGold: '45', cardNo: 'CARD006' },
                { ordernumber: 'ORD007', chargeStatus: '取消', orderstate: '已取消', mobile: '13800138006', parkId: 'CP007', portName: 'G07', realHour: '0', orderGold: '0', cardNo: 'CARD007' },
                { ordernumber: 'ORD008', chargeStatus: '进行中', orderstate: '未完成', mobile: '13800138007', parkId: 'CP008', portName: 'H08', realHour: '0.75', orderGold: '20', cardNo: 'CARD008' },
                { ordernumber: 'ORD009', chargeStatus: '完成', orderstate: '已完成', mobile: '13800138008', parkId: 'CP009', portName: 'I09', realHour: '2.5', orderGold: '65', cardNo: 'CARD009' },
                { ordernumber: 'ORD010', chargeStatus: '进行中', orderstate: '未完成', mobile: '13800138009', parkId: 'CP010', portName: 'J10', realHour: '1.25', orderGold: '35', cardNo: 'CARD010' }
            ],
            total: 10 // 总记录数
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