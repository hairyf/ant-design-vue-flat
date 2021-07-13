<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-12 17:50:50
 * @LastEditTime: 2021-07-12 18:05:49
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <n-ellipsis class="cal-ellipsis" v-bind="props">
    <slot />
  </n-ellipsis>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalEllipsis' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import { NEllipsis } from 'naive-ui'
  import { inheritNaiveUiProps } from '../../../utils/common'

  const props = defineProps({
    ...inheritNaiveUiProps(NEllipsis)
  })
</script>

<style lang="scss" scoped></style>
