<!--
 * @Author: Mr.Mao
 * @Date: 2021-05-20 17:54:55
 * @LastEditTime: 2021-07-22 15:32:23
 * @Description: 菜单栏
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <ul class="cal-menu transition-all duration-200 flex-1">
    <cal-perfect-scrollbar class="h-full">
      <slot />
    </cal-perfect-scrollbar>
  </ul>
</template>
<script lang="ts">
  import { useVModel } from '@vueuse/core'
  import { computed, defineComponent } from 'vue'
  export default defineComponent({ name: 'CalMenu' })
</script>
<script lang="ts" setup>
  import { defineProps, provide, toRef } from 'vue'
  import CalPerfectScrollbar from '../../perfect-scrollbar/src/PerfectScrollbar.vue'
  const props = defineProps({
    /** 是否收起 */
    collapse: Boolean,
    /** 默认高亮項 */
    defaultActive: {
      type: Array as () => string[] | string,
      default: []
    },
    /** 样式类型 */
    styleType: String
  })
  /** 选中列表 */
  const source = useVModel(props, 'defaultActive')
  const defaultActive = computed({
    get: () => (Array.isArray(source.value) ? source.value : [source.value]),
    set: (value) => {
      Array.isArray(source.value) ? (source.value = value) : ((source.value as string) = value[0])
    }
  })
  type Part<T> = T | undefined
  const emit = defineEmits(['update'])
  provide('collapse', toRef(props, 'collapse'))
  provide('defaultActive', defaultActive)
  provide('onUpdate', (key: Part<string>, indexs: Part<string>[]) => {
    defaultActive.value = indexs as string[]
    emit('update', key, indexs)
  })
  provide('styleType', props.styleType)
</script>
<style lang="scss" scoped></style>
