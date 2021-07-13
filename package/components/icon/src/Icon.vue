<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-12 14:04:45
 * @LastEditTime: 2021-07-12 19:24:32
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <i
    class="cal-icon"
    v-html="svgTag"
    :style="{ color, fontSize: analyUnit(size || ''), width, height }"
  >
  </i>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  export default defineComponent({ name: 'CalIcon' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import { analyUnit } from '@tuimao/utils'
  import option from './iconfont.json'
  const props = defineProps({
    type: {
      type: String as () => keyof typeof option,
      required: true
    },
    size: String,
    color: String,
    // 是否使用 svg 尺寸
    svgSize: Boolean
  })
  const width = computed(() => {
    const value = option[props.type]?.match(/width="(?<width>\w*%?)"/)?.groups?.width || ''
    return (props.svgSize && analyUnit(value)) || ''
  })
  const height = computed(() => {
    const value = option[props.type]?.match(/height="(?<height>\w*%?)"/)?.groups?.height || ''
    return (props.svgSize && analyUnit(value)) || ''
  })
  const svgTag = computed(() => {
    const value = option[props.type]
    if (!props.svgSize) {
      return value?.replace(/width="(\w*%?)"/g, '')?.replace(/height="(\w*%?)"/g, '')
    }
    return value
  })
</script>
<style lang="scss" scoped>
  .cal-icon {
    height: 1em;
    width: 1em;
    display: inline-block;
    position: relative;
    svg {
      height: 1em;
      width: 1em;
    }
  }
</style>
