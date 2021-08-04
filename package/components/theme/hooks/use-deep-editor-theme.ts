/*
 * @Author: Mr.Mao
 * @Date: 2021-07-30 10:57:15
 * @LastEditTime: 2021-07-30 11:45:38
 * @Description:
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
 */
import { useStorage } from '@vueuse/core'
import { forIn, get, set, camelCase } from 'lodash-es'
import { ThemeOverrides, useGlobalTheme } from '../../../utils'
import { computed, WritableComputedRef } from 'vue'
import { THEME_EDIT_KEY } from '../config'
type DeepThemeConfigItem = { target: string[]; value: WritableComputedRef<string>; name: string }

export const useDeepEditorTheme = () => {
  // 当前全局挂载主题
  const currentTheme = useGlobalTheme()
  // 本地缓存主题
  const localeTheme = useStorage<ThemeOverrides>(THEME_EDIT_KEY, {})
  // 深层编辑主题
  const deepEditorTheme = computed(() => {
    const deepThemeConfig: Record<string, DeepThemeConfigItem[]> = {}
    const getTargetComputed = (target: string[]) => {
      return {
        value: computed({
          get: () => (get(localeTheme.value, target) as string) || '',
          set: (value) => {
            if (!value) {
              const source = get(localeTheme.value, target.slice(0, target.length - 1))
              delete source[target[target.length - 1]]
              const empty = !Object.values((localeTheme.value as any)[target[0]]).some((v) => v)
              if (empty) delete (localeTheme.value as any)[target[0]]
            } else {
              set(localeTheme.value, target, value)
            }
          }
        }),
        target,
        name: camelCase(target.join('-'))
      }
    }
    const getThemeComputeds = (option: object, upperPath: string) => {
      const array: DeepThemeConfigItem[] = []
      let pathMaps: string[] = [upperPath]
      const recursion = (option: object) => {
        forIn(option, (v, k) => {
          pathMaps.push(k)
          if (typeof v === 'object') {
            recursion(v)
          } else {
            array.push(getTargetComputed([...pathMaps]))
          }
          pathMaps = pathMaps.slice(0, pathMaps.indexOf(k))
        })
      }
      recursion(option)
      return array
    }
    forIn(currentTheme.value, (v, k) => {
      deepThemeConfig[k] = getThemeComputeds(v, k)
    })
    return deepThemeConfig
  })

  return {
    deepEditorTheme,
    localeTheme,
    currentTheme
  }
}
