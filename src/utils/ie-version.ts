/*
 * @Author: Mr.Mao
 * @Date: 2021-03-12 13:58:29
 * @LastEditTime: 2021-04-07 19:11:48
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
/**
 * 判断当前是否是IE浏览器
 * @returns IE 版本 -1则代表不为 IE 浏览器
 */
export const getIeVersion = () => {
  // 取得浏览器的userAgent字符串
  const userAgent = navigator.userAgent
  // 判断是否IE<11浏览器
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1
  // const isEdge = userAgent.indexOf('Edge') > -1 && !isIE //判断是否IE的Edge浏览器
  const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    const fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion == 7) {
      return 7
    } else if (fIEVersion == 8) {
      return 8
    } else if (fIEVersion == 9) {
      return 9
    } else if (fIEVersion == 10) {
      return 10
    }
    return 6
  } else if (isIE11) {
    return 11
  }
  return -1 //不是ie或是edge浏览器
}
