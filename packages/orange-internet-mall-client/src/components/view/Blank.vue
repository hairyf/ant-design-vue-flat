<!--
 * @Author: Mr.Mao
 * @Date: 2021-03-25 21:39:06
 * @LastEditTime: 2021-04-15 19:06:53
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    :style="{
      height: `${option.height * 2}rpx`,
      backgroundColor: option.background,
    }"
  />
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { blankOption } from 'orange-components-config/options';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof blankOption,
      required: true,
    },
  },
});
</script>
