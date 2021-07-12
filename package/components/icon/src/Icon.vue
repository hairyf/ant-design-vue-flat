<!--
 * @Author: Mr.Mao
 * @Date: 2021-07-12 14:04:45
 * @LastEditTime: 2021-07-12 14:59:47
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <i class="cal-icon" v-html="option[type]"> </i>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({ name: 'CalIcon' })
</script>
<script lang="ts" setup>
  import { defineProps } from 'vue-demi'
  import option from './iconfont.json'
  defineProps({
    type: {
      type: String as () => keyof typeof option,
      required: true
    }
  })
</script>
