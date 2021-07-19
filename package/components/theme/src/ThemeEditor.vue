<!--
 * @Author: Zhilong
 * @Date: 2021-07-19 10:07:11
 * @LastEditTime: 2021-07-19 10:35:49
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: ⚠ warning!  ⚠ warning!  ⚠ warning!   ⚠野生的页面出现了!!
-->
<template>
  <slot />
  <cal-button @click="resetLocaleTheme">重置</cal-button>
  <div class="cal-theme-editor">
    <div v-for="(items, key) in deepEditorTheme" :key="key">
      <div>{{ key }}</div>
      <div class="ml-10" v-for="(item, index) in items" :key="index">
        {{ item.name }}：<cal-input
          v-model="item.value.value"
          :placeholder="get(currentTheme, item.target)"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, inject, provide, readonly } from 'vue'
  import { useGlobalTheme } from '../../../utils'
  import { useStorage } from '@vueuse/core'
  import { THEME_EDIT_KEY } from '../config'
  import type { WritableComputedRef, Ref } from 'vue'
  import type { ThemeOverrides } from '../../../utils/theme'
  import { forIn, get, set, camelCase, merge } from 'lodash'
  export default defineComponent({ name: 'CalThemeEditor' })
</script>
<script lang="ts" setup>
  type DeepThemeConfigItem = { target: string[]; value: WritableComputedRef<string>; name: string }
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
            if (value) {
              set(localeTheme.value, target, value)
            } else {
              delete (localeTheme.value as any)[target[0]]
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
  // 重置编辑主题
  const resetLocaleTheme = () => (localeTheme.value = {})
  const injectOverrides = inject<Ref<ThemeOverrides>>('themeOverrides')
  const mergeTheme = computed(() => merge(injectOverrides?.value, localeTheme.value))
  provide('themeOverrides', mergeTheme)
</script>

<style lang="scss" scoped></style>
