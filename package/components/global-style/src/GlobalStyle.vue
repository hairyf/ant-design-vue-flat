<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-14 09:35:52
 * @LastEditTime: 2021-07-30 10:10:12
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <slot />
</template>

<script lang="ts">
  import { defineComponent, watch } from 'vue'
  export default defineComponent({ name: 'CalGlobalStyle' })
</script>
<script lang="ts" setup>
  import { defineProps, toRef, watchEffect } from 'vue'
  import { transformTheme2CssVars, useGlobalTheme } from '../../../utils/theme'
  const props = defineProps({
    root: {
      type: Object as () => HTMLElement,
      default: document.documentElement
    }
  })
  const root = toRef(props, 'root')
  const globalTheme = useGlobalTheme()
  watch(
    globalTheme,
    (value) => {
      const cssVars = transformTheme2CssVars(value)
      for (const [key, value] of Object.entries(cssVars)) {
        if (root.value.style.getPropertyPriority(`--${key}`) === value) continue
        root.value.style.removeProperty(`--${key}`)
        root.value.style.setProperty(`--${key}`, value)
      }
    },
    { deep: true, immediate: true }
  )
</script>
<style lang="scss" scoped></style>
