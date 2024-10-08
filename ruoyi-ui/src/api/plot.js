// import request from '@/utils/request'

// const baseService = '/jingli-admin';
// // plot/getPlotList
// export function getPlotList(data) {
//     return request({
//         url: baseService + '/plot/getPlotList',
//         method: 'get',
//         params: data

//     })
// }
// plot.js
import { faker } from 'faker';

// 生成随机整数
function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成随机字符串
function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// 模拟 getPlotList 数据
export function getPlotList(data) {
  return Promise.resolve({
    code: 200,
    data: {
      list: Array.from({ length: 10 }, () => ({
        id: faker.datatype.uuid(),
        name: `地块${generateRandomInt(1, 100)}`,
        location: `${generateRandomString(10)}区`,
        area: `${generateRandomInt(100, 500)} 平方米`,
        status: faker.random.arrayElement(['可用', '已占用', '维护中']),
        createTime: faker.date.recent().toISOString().split('T')[0]
      }))
    }
  });
}