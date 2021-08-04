/*
 * @Author: Mr.Mao
 * @Date: 2021-04-29 19:13:01
 * @LastEditTime: 2021-04-29 19:13:40
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */

import dayjs from 'dayjs';

/**
 * 过滤字符串为数值
 * @param str 字符串
 * @returns 数值
 */
export const filterOutNumber = (str: string) => {
  const filterStr = str.replace(/[^0-9]/g, '');
  const outCount = filterStr !== '' ? Number(filterStr) : filterStr;
  return outCount;
};

/**
 * 地址参数计算
 * @param url 拼接地址
 * @param params 拼接参数
 * @returns 拼接字符串
 */
export const paramsAnaly = (url: string, params: Record<string, any> = {}) => {
  const queryStr = Object.keys(params).map((key) => `${key}=${params[key]}`);
  if (queryStr.length > 0) {
    url += '?' + queryStr.join('&');
  }
  return url;
};

/**
 * 计算权限
 * @param status 状态值
 * @param args 对应权限
 * @returns 返回是否存在对应权限
 */
export function calcul(status: string | number, ...args: [string]) {
  const findRes = args.find((s) => s == status);
  return typeof findRes !== 'undefined';
}

/**
 * 时间戳格式化(秒)
 * @param timestamp 格式化时间戳(秒)
 * @param format 格式化时间格式
 * @returns 格式时间字符串
 */
export const formatUnix = (
  timestamp: number,
  format = 'YYYY-MM-DD HH:mm:ss'
) => {
  return dayjs.unix(timestamp).format(format);
};
