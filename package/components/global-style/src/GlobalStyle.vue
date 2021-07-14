<template>
  <slot />
</template>

<script lang="ts">
  import { defineComponent, defineProps, toRef, watchEffect } from 'vue'
  import { transformTheme2CssVars, useGlobalTheme } from '../../../utils/theme'
  export default defineComponent({ name: 'CalGlobalStyle' })
</script>
<script lang="ts" setup>
  const props = defineProps({
    root: {
      type: Object as () => HTMLElement,
      default: document.documentElement
    }
  })
  const root = toRef(props, 'root')
  const globalTheme = useGlobalTheme()
  watchEffect(() => {
    const cssVars = transformTheme2CssVars(globalTheme.value)
    for (const key in cssVars) {
      root.value.style.removeProperty(`--${key}`)
      root.value.style.setProperty(`--${key}`, cssVars[key])
    }
  })
</script>
<style lang="scss" scoped></style>
