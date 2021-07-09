<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-22 14:18:13
 * @LastEditTime: 2021-07-09 10:52:31
 * @Description: 配置注入
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="cal-config-provider">
    <config-provider v-bind="props">
      <slot></slot>
    </config-provider>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalConfigProvider' })
</script>
<script lang="ts" setup>
  import { defineProps, provide, toRef } from 'vue'
  import { ConfigProvider } from 'ant-design-vue'
  import { defaultTheme, mountTheme } from '../../../utils/theme'
  import type { ThemeOption } from '../../../utils/theme'
  const props = defineProps({
    ...(ConfigProvider.props as {}),
    themeOverrides: {
      type: Object as () => ThemeOption,
      default: defaultTheme()
    }
  })
  const themeOverrides = toRef(props, 'themeOverrides')
  mountTheme(themeOverrides)
  provide('currentTheme', themeOverrides)
</script>

<style lang="scss" scoped>
  .cal-config-provider {
    color: var(--color);
  }
</style>
