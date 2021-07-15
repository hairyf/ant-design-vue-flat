/*
 * @Author: Mr.Mao
 * @Date: 2021-03-12 13:58:29
 * @LastEditTime: 2021-07-15 09:37:47
 * @Description:
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import store from '@/store'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

/**
 * 如果有单位，如百分比，px单位等，直接返回，如果是纯粹的数值，则加上px单位
 * @param unit 单元
 * @returns string
 */
export const analyUnit = (unit: string | number) => {
  return typeof unit === 'string' && /[^0-9]/g.test(unit) ? unit : unit + 'px'
}
/**
 * 截取字符串
 * @param text 字符串
 * @param length 截取长度
 * @returns 截取字符串
 */
export const tailoringText = (text: string, length: number) => {
  if (typeof text === 'string' && text.length > length) {
    return text.substring(0, length - 2) + '...'
  }
  return text
}
/**
 * 颜色混合器
 * @param colorOne 颜色值
 * @param colorTwo 颜色值
 * @param ratio 根据 colorTwo 混合比例, 0~1 区间, 1 则是完全的 colorTwo
 * @returns 混合颜色
 */
export const blendColor = (colorOne: string, colorTwo: string, ratio: number) => {
  ratio = Math.max(Math.min(Number(ratio), 1), 0)
  const r1 = parseInt(colorOne.substring(1, 3), 16)
  const g1 = parseInt(colorOne.substring(3, 5), 16)
  const b1 = parseInt(colorOne.substring(5, 7), 16)
  const r2 = parseInt(colorTwo.substring(1, 3), 16)
  const g2 = parseInt(colorTwo.substring(3, 5), 16)
  const b2 = parseInt(colorTwo.substring(5, 7), 16)
  let r: string | number = Math.round(r1 * (1 - ratio) + r2 * ratio)
  let g: string | number = Math.round(g1 * (1 - ratio) + g2 * ratio)
  let b: string | number = Math.round(b1 * (1 - ratio) + b2 * ratio)
  r = ('0' + (r || 0).toString(16)).slice(-2)
  g = ('0' + (g || 0).toString(16)).slice(-2)
  b = ('0' + (b || 0).toString(16)).slice(-2)
  return '#' + r + g + b
}
/**
 * 将 hex 颜色转成 rgb
 * @param hex
 * @param opacity
 * @returns rgba String
 */
const hexToRgba = (hex: string, opacity: number) => {
  const RGBA =
    'rgba(' +
    parseInt('0x' + hex.slice(1, 3)) +
    ',' +
    parseInt('0x' + hex.slice(3, 5)) +
    ',' +
    parseInt('0x' + hex.slice(5, 7)) +
    ',' +
    opacity +
    ')'
  return {
    red: parseInt('0x' + hex.slice(1, 3)),
    green: parseInt('0x' + hex.slice(3, 5)),
    blue: parseInt('0x' + hex.slice(5, 7)),
    rgba: RGBA
  }
}
/**
 * 设置全局主题色
 * @param color 颜色值
 */
export const setThemeColor = (option: typeof store.state.theme.option) => {
  const darkColor = blendColor('#000000', option.color, 0.2)
  document.documentElement.style.setProperty('--color-tab-bar', option.sideBarColor || darkColor)
  document.documentElement.style.setProperty('--color-hollow', option.hollowColor)
  document.documentElement.style.setProperty('--color-solid', option.solidColor)
  document.documentElement.style.setProperty('--color-primary', option.color)
  document.documentElement.style.setProperty('--main-background', option.mainBackground)
  document.documentElement.style.setProperty('--background', option.background)
  document.documentElement.style.setProperty('--blur-size', option.blur)
  for (let i = 1; i < 10; i++) {
    const cssLightVariable = `--color-primary-light-${i}`
    const cssLightOpacity = `--color-primary-light-opacity-${i}`
    const cssDarkVariable = `--color-primary-dark-${i}`
    document.documentElement.style.setProperty(
      cssLightOpacity,
      hexToRgba(option.color, 1 - i / 10).rgba
    )
    document.documentElement.style.setProperty(
      cssLightVariable,
      blendColor('#ffffff', option.color, 1 - i / 10)
    )
    document.documentElement.style.setProperty(
      cssDarkVariable,
      blendColor('#000000', option.color, 1 - i / 10)
    )
  }
}
/**
 * 生成递进的数组
 * @param start 开始数值
 * @param end 结束数值
 * @returns 递进的数组
 */
export const generateArray = (start: number, end: number) => {
  start = Number(start)
  end = Number(end)
  end = end > start ? end : start
  return [...Array(end + 1).keys()].slice(start)
}

/**
 * 过滤字符串为数值
 * @param str 字符串
 * @returns 数值
 */
export const filterOutNumber = (str: string) => {
  const filterStr = str.replace(/[^0-9]/g, '')
  const outCount = filterStr !== '' ? Number(filterStr) : filterStr
  return outCount
}

/**
 * 地址参数计算
 * @param url 传入url
 * @param params 请求参数
 * @returns 拼接url
 */
export const paramsAnaly = (url: string, params: Record<string, any>) => {
  const queryStr = Object.keys(params).map((key) => `${key}=${params[key]}`)
  if (queryStr.length > 0) {
    url += '?' + queryStr.join('&')
  }
  return url
}

/**
 * 时间戳格式化(秒)
 * @param timestamp 格式化时间戳(秒)
 * @param format 格式化时间格式
 * @returns 格式时间字符串
 */
export const formatUnix = (timestamp: number, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs.unix(timestamp).format(format)
}

/**
 * 自定义 Promise 等待
 * @param code 等待时间
 */
export const awaitPromise = (code = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, code))
}

/**
 * 自动拼接基本路径
 * @param str 替换路径
 * @deprecated 组件编译后静态资源不会导出
 */
export const sliceBaseUrl = (str: string) => {
  return str.replace('@/', import.meta.env.BASE_URL + import.meta.env.DEV ? 'src/' : '')
}

/**
 * 过滤为价格(两位小数点)
 * @param value 传入字符
 */
export const filterPrice = (value: string) => {
  return value
    .replace(/^[^\d+]/, '')
    .replace(/[^\d{1,}.\d{1,}|\d{1,}]/g, '')
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
    .replace(/\.{2,}/g, '.')
    .replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
}

/**
 * 过滤为正整数
 * @param value 传入字符
 */
export const filterInteger = (value: string) => {
  return value.replace(/^(0+)|[^\d]+/g, '')
}

/**
 * @name 将区间数组自动处理给后端
 * @param value { array }
 * @returns value { string }
 * @description 将区间值 处理为 [xx,xx] 或 ""给后端
 */
export const handelSection = (value: string[] | number[]) => {
  return value.join('') ? value : ''
}

/**
 * 选择多个图片
 * @param option
 * @returns FileList
 */
export const selectImages = () => {
  return new Promise<File[]>((resolve, reject) => {
    const inputEl = document.createElement('input')
    inputEl.type = 'file'
    inputEl.multiple = true
    inputEl.accept = 'image/jpeg,image/x-png,image/gif'
    inputEl.click()
    const timer = setTimeout(reject, 20 * 1000)
    inputEl.addEventListener('change', function () {
      if (this.files) {
        resolve(Object.values(this.files))
        clearTimeout(timer)
      }
    })
  })
}

/**
 * 下载文件
 * @param url 下载地址
 * @param fileName 文件名称
 */
export const downloadFile = (url: string, fileName?: string) => {
  const a = document.createElement('a')
  fileName && (a.download = fileName)
  a.href = url
  a.click()
}

/**
 * 随机字符串
 * @param size 字符串长度
 * @returns { string }
 */
export const randomString = (size = 5) => {
  let stringLength: number
  stringLength = size > 9 ? 9 : size
  stringLength = size < 1 ? 1 : size
  const randomString = Math.random().toString(36)
  return randomString.slice(stringLength * -1, randomString.length)
}
