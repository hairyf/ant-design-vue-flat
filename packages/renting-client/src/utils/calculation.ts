/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-11 18:42:22
 * @LastEditTime: 2021-01-28 17:29:28
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import dayjs from 'dayjs';
import nzh from 'nzh';

// 传入字符串和长度, 返回字符串, 超出长度以...展示
export function strEllipsis(str: '', length = 30) {
  if (str.length > length) {
    return str.slice(0, length).trim() + '...';
  }
  return str;
}
// 地址参数计算
export const paramsAnaly = (url: string, params: Record<string, any>) => {
  const queryStr = Object.keys(params).map((key) => `${key}=${params[key]}`);
  if (queryStr.length > 0) {
    url += '?' + queryStr.join('&');
  }
  return url;
};
// 如果有单位，如百分比，px单位等，直接返回，如果是纯粹的数值，则加上rpx单位
export const analyUnit = (unit: string | number) => {
  return typeof unit === 'string' && /[^0-9]/g.test(unit) ? unit : unit + 'rpx';
};
// 过滤字符串为数值
export const filterOutNumber = (str: string) => {
  const filterStr = str.replace(/[^0-9]/g, '');
  const outCount = filterStr !== '' ? Number(filterStr) : filterStr;
  return outCount;
};
// 过滤时间戳格式
export const format = (timeStamp: number, timeFormat = 'YYYY-MM-DD') => {
  return timeStamp ? dayjs.unix(timeStamp).format(timeFormat) : '暂无时间';
};
// 将数字转为中文数字
export const numberToChinese = (number: number) => {
  return nzh.cn.encodeS(number);
};
// 取得数组深度
export const getDepth = (arr: any[], depth = 1): number => {
  let flag = false;
  const temp = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].child instanceof Array) {
      for (let j = 0; j < arr[i].child.length; j++) {
        temp.push(arr[i].child[j]); // 解析出arr下第一层
      }
      flag = true;
    }
  }
  if (flag) {
    // 如果还有数组，则继续解析，直到最后一层有不为数组为止
    depth++;
    return getDepth(temp, depth);
  }
  return depth;
};
