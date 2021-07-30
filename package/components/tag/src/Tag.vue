<!--
 * @Author: Mr.wang
 * @Date: 2021-07-14 10:00:25
 * @LastEditTime: 2021-07-30 10:23:05
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <a-tag v-bind="props">
    <slot />
  </a-tag>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalTag' })
</script>
<script setup lang="ts">
  import { defineProps } from 'vue'
  import { useTheme } from '../../../utils/theme'
  import ATag from 'ant-design-vue/es/tag'
  const props = defineProps({
    ...(ATag.props as any),
    color: {
      type: String,
      default: 'var(--common-primary-color)'
    }
  })
  useTheme('Common')
</script>

<style lang="scss"></style>
