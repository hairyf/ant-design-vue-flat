/*
 * @Author: Mr.Mao
 * @Date: 2021-07-08 15:55:33
 * @LastEditTime: 2021-07-12 17:03:37
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
export const defaultTheme = () => cloneDeep(merge(option.colors, option.sizes, option.basics))

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
 * 获取当前主题配置
 * @param identif 主题标识 >> keyof option
 * @returns {themeMerge}
 */
export const useTheme = <K extends keyof ThemeDefaultOption>(identif: K) => {
  const theme = ref(defaultTheme())
  const themeOverrides = inject<Ref<ThemeDefaultOption>>('themeOverrides')
  const themeMerge = computed(() => merge(theme.value, themeOverrides?.value)[identif])
  return themeMerge
}

/**
 * 获取全局主题配置
 * @returns {themeMerge}
 */
export const useGlobalTheme = () => {
  const theme = ref(defaultTheme())
  const themeOverrides = inject<Ref<ThemeDefaultOption>>('themeOverrides')
  const themeMerge = computed(() => merge(theme.value, themeOverrides?.value))
  return themeMerge
}
