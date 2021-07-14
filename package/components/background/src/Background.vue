<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-22 14:18:13
 * @LastEditTime: 2021-07-09 20:05:00
 * @Description: 按钮
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="cal-background absolute left-0 top-0 bottom-0 right-0 overflow-hidden"
    :style="{ backgroundColor: color, filter: blur, backgroundImage: image, zIndex }"
  >
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  export default defineComponent({ name: 'CalBackground' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { useTheme } from '../../../utils/theme'
  const props = defineProps({
    image: String,
    color: String,
    blur: String,
    zIndex: {
      type: Number,
      default: -100
    }
  })
  const theme = useTheme('Background')
  const image = computed(() => props.image || theme.value.image)
  const color = computed(() => props.color || theme.value.color)
  const blur = computed(() => props.blur || theme.value.blur)
</script>
<style lang="scss" scoped>
  .cal-background {
    transition: 0.2s background;
    z-index: -1;
  }
</style>
