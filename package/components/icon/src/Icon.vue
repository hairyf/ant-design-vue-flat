<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-12 14:04:45
 * @LastEditTime: 2021-08-09 16:02:29
 * @Description: 
 * @LastEditors: Zhilong
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <n-icon class="cal-icon" v-bind="props" :size="size" v-html="svgCotnent" />
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import type { PropType } from 'vue'
  import { NIcon } from 'naive-ui/es/icon'
  export default defineComponent({ name: 'CalIcon' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { analyUnit, removeHtmlStrTagAttr } from '@tuimao/utils'
  import option from './iconfont.json'
  const props = defineProps({
    // 图标类型
    type: String as PropType<IconFontKey>,
    // 图标尺寸
    size: [String, Number],
    // 图标颜色
    color: String,
    // 保留 svg 宽高属性, 开启后 size 失效
    svgSize: Boolean,
    // 自定义 svg 内容
    svgContent: String
  })
  const svgCotnent = computed(() => {
    return props.svgContent || option[props.type!]
  })
  const width = computed(() => {
    const value = svgCotnent.value?.match(/width="(?<width>\w*%?)"/)?.groups?.width || ''
    return (props.svgSize && analyUnit(value)) || ''
  })
  const height = computed(() => {
    const value = svgCotnent.value?.match(/height="(?<height>\w*%?)"/)?.groups?.height || ''
    return (props.svgSize && analyUnit(value)) || ''
  })
  const size = computed(() => {
    return props.svgSize ? width.value || props.size : props.size || width.value
  })
</script>
<style lang="scss">
  .cal-icon {
    width: 1em;
    display: inline-block;
    svg {
      height: 1em;
      width: 1em;
    }
  }
</style>
