/*
 * @Author: Pan.Yu.Lin
 * @Date: 2021-03-26 09:49:09
 * @LastEditTime: 2021-05-10 19:08:41
 * @Description:
 * @LastEditors: Pan.Yu.Lin
 */
// 保留两位小数
export const inputInterception = (value: any) => {
  return value
    .replace(/^[^\d+]/, '')
    .replace(/[^\d{1,}.\d{1,}|\d{1,}]/g, '')
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
    .replace(/\.{2,}/g, '.')
    .replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
}
// 只能输入正整数
export const inputStock = (value: any) => {
  return value.replace(/^(0+)|[^\d]+/g, '')
}
