<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-08 09:48:36
 * @LastEditTime: 2021-05-13 14:24:11
 * @Description: 首页
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <view-controller type="customPage">
    <view-distribution />
    <common-copyright slot="sticky" />
  </view-controller>
</template>

<script lang="ts">
import { useLifecycleProvide } from '@/hooks/use-page-lifecycle';
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
  setup() {
    useLifecycleProvide();
    return {};
  },
});
</script>

<style lang="scss">
/* 全局样式 */
page {
  height: 100%;
}
</style>
