<template>
  <div class="cal-config-provider">
    <config-provider v-bind="props">
      <slot></slot>
    </config-provider>
  </div>
  <div style="color: var(--color)">adasd</div>
</template>

<script lang="ts" setup>
  import { defineProps, ref, useCssVars } from 'vue'
  import { ConfigProvider } from 'ant-design-vue'
  import { defaultTheme } from '../../utils/theme'
  import type { ThemeOption } from '../../utils/theme'
  const props = defineProps({
    ...(ConfigProvider.props as {}),
    themeOverrides: {
      type: Object as () => ThemeOption,
      default: defaultTheme()
    }
  })
  const color = ref('red')
  useCssVars(() => ({
    color: color.value
  }))
</script>

<style lang="scss" scoped>
  .cal-config-provider {
    color: v-bind(color);
  }
</style>
