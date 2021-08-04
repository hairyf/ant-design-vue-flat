<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-23 15:46:50
 * @LastEditTime: 2021-07-15 10:03:17
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <hex-color-picker :style="style" :color="color" @color-changed="color = $event.detail.value" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalColorFullPickr' })
</script>
<script lang="ts" setup>
  import { analyUnit } from '@tuimao/utils'
  import { useVModel } from '@vueuse/core'
  import { computed, defineProps } from 'vue'
  import 'vanilla-colorful'
  const props = defineProps({
    modelValue: String,
    width: {
      type: [String, Number],
      default: 150
    },
    height: {
      type: [String, Number],
      default: 100
    }
  })
  const style = computed(() => ({
    width: analyUnit(props.width),
    height: analyUnit(props.height)
  }))

  const color = useVModel(props, 'modelValue')
</script>
<style lang="scss" scoped></style>
