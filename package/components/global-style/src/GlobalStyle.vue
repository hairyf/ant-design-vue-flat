<template>
  <slot />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { defineProps, toRef, watchEffect } from 'vue-demi'
  import { transformTheme2CssVars, useGlobalTheme } from '../../../utils/theme'
  export default defineComponent({
    name: 'CalGlobalStyle',
    props: {
      root: {
        type: Object as () => HTMLElement,
        default: document.documentElement
      }
    },
    setup: (props) => {
      const root = toRef(props, 'root')
      const globalTheme = useGlobalTheme()
      watchEffect(() => {
        const cssVars = transformTheme2CssVars(globalTheme.value)
        for (const key in cssVars) {
          root.value.style.removeProperty(`--${key}`)
          root.value.style.setProperty(`--${key}`, cssVars[key])
        }
      })
    }
  })
</script>

<style lang="scss" scoped></style>
