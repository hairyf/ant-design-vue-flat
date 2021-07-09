/*
 * @Author: Mr.Mao
 * @Date: 2021-07-08 15:55:33
 * @LastEditTime: 2021-07-09 16:30:54
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { computed, inject, ref, Ref, ComputedRef, useCssVars } from 'vue'
import { cloneDeep, kebabCase, merge } from 'lodash-es'
import * as option from '../theme/default'

type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T

export type ThemeDefaultOption = ReturnType<typeof defaultTheme>
export type ThemeOverrides = DeepPartial<ThemeDefaultOption>
export type ThemeAnyOption = { [key: string]: ThemeAnyOption }
export type MountThemeParame = ComputedRef<ThemeAnyOption> | Ref<ThemeAnyOption>

/** 获取默认配置 */
export const defaultTheme = () => cloneDeep(merge(option.colors, {}))

/**
 * 将主题转换为 css 变量 key in value
 * @param theme
 * @returns {Record<string, string>}
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
        const key = kebabCase(
          keys
            .map((v) => v[0].toUpperCase() + v.slice(1))
            .join('')
            .trim()
        )
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
 * @returns {void}
 */
export const mountTheme = (theme: MountThemeParame) => {
  useCssVars(() => transformTheme2CssVars(theme.value))
}

/**
 * 获取当前主题配置
 * @param identif 主题标识 >> keyof option
 * @returns {themeMerge}
 */
export const useTheme = <K extends keyof ThemeDefaultOption>(identif: K) => {
  const theme = ref(defaultTheme())
  const themeOverrides = inject<Ref<ThemeDefaultOption>>('themeOverrides')
  const themeMerge = computed(() => merge(theme.value, themeOverrides?.value)[identif])
  const themeMount = computed(() => <ThemeAnyOption>{ [identif]: themeMerge.value })
  mountTheme(themeMount)
  return themeMerge
}
