<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-20 17:54:55
 * @LastEditTime: 2021-07-12 19:35:49
 * @Description: 菜单栏
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <ul class="cal-menu transition-all duration-200">
    <slot />
  </ul>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalMenu' })
</script>
<script lang="ts" setup>
  import { defineProps, provide, toRef } from 'vue'
  const props = defineProps({
    /** 收起宽度 */
    collapseWidth: {
      type: [Number, String],
      default: 66
    },
    /** 是否收起 */
    collapse: Boolean,
    /** 默认高亮項 */
    defaultActive: {
      type: Array as () => string[],
      default: []
    },
    /** 更新事件方法 */
    onUpdate: {
      type: Function
    },
    /** 样式类型 */
    styleType: String
  })
  provide('collapse', toRef(props, 'collapse'))
  provide('defaultActive', toRef(props, 'defaultActive'))
  provide('onUpdate', props.onUpdate)
  provide('styleType', props.styleType)
</script>
<style lang="scss" scoped></style>
