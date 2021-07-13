<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-13 11:01:35
 * @LastEditTime: 2021-07-13 11:07:59
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <slot />
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalProvide' })
</script>
<script lang="ts" setup>
  import { defineProps, provide } from 'vue-demi'
  const props = defineProps({
    id: {
      type: String,
      required: true
    },
    value: Object as any
  })
  provide(props.id, props.value)
</script>

<style lang="scss" scoped></style>
