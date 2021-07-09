/*
 * @Author: Mr.Mao
 * @Date: 2021-07-08 15:55:33
 * @LastEditTime: 2021-07-09 14:36:49
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { Ref, useCssVars } from 'vue'
import { cloneDeep, merge } from 'lodash-es'
export type ThemeOption = ReturnType<typeof defaultTheme>
import * as option from '../theme/default'
// 获取默认主题
export const defaultTheme = () => cloneDeep(merge(option.colors, {}))
/**
 * 将主题转换为 css 变量 key in value
 * @param theme
 * @returns
 */
export const transformTheme2CssVars = (theme: Record<string, Object | 'string'>) => {
  const result: Record<string, string> = {}
  let keys: string[] = []
  const recursion = (option: Record<string, Object | 'string'>) => {
    for (const k in option) {
      const v = option[k]
      const isObject = typeof v === 'object'
      keys.push(k)
      if (isObject) {
        recursion(v as any)
        keys = []
      } else {
        const key = keys
          .map((v) => v[0].toUpperCase() + v.slice(1))
          .join('')
          .trim()
        const value = v as string
        key && (result[key] = value)
        keys.splice(keys.length - 1, 1)
      }
    }
  }
  recursion(theme)
  return result
}

/**
 * 通过 useCssVars 挂载主题
 * @param theme
 */
export const mountTheme = (theme: Ref<ThemeOption>) => {
  useCssVars(() => transformTheme2CssVars(theme.value))
}

// 获取当前主题配置
export const useTheme = () => {}
