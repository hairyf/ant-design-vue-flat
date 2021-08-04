/*
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-11 18:42:22
 * @LastEditTime: 2021-01-21 15:47:57
 * @Description:
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
/* 语法糖工具类 */

// for in封装
export function forIn<T>(
  object: T,
  callback: (
    key: keyof T,
    val: T[Extract<keyof T, string>],
    index: number
  ) => void
) {
  let index = 0;
  for (const key in object) {
    callback(key, object[key], index);
    index++;
  }
  return object;
}
