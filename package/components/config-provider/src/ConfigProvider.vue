<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-22 14:18:13
 * @LastEditTime: 2021-07-15 15:38:10
 * @Description: 配置注入
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="cal-config-provider">
    <slot></slot>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  export default defineComponent({ name: 'CalConfigProvider' })
</script>
<script lang="ts" setup>
  import { defineProps, provide, toRef, inject } from 'vue'
  import { ConfigProvider } from 'ant-design-vue'
  import { merge } from 'lodash'
  import type { Ref } from 'vue'
  import type { ThemeOverrides } from '../../../utils/theme'
  const props = defineProps({
    ...(ConfigProvider.props as {}),
    themeOverrides: {
      type: Object as () => ThemeOverrides,
      default: {}
    }
  })
  const themeOverrides = toRef(props, 'themeOverrides')
  const injectOverrides = inject<Ref<ThemeOverrides>>('themeOverrides')
  const mergeTheme = computed(() => merge(injectOverrides?.value, themeOverrides.value))
  provide('themeOverrides', mergeTheme)
</script>

<style lang="scss" scoped>
  .cal-config-provider {
    color: var(--color);
  }
</style>
