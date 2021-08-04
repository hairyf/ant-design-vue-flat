<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-16 20:25:52
 * @LastEditTime: 2021-05-14 15:42:24
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div></div>
</template>

<script lang="ts">
import store from '@/store';
import { defineComponent } from '@vue/composition-api';
// 开启 App 获取页面模板
export default defineComponent({
  onShow() {
    store.dispatch('setTabBarIndex');
  },
  setup() {
    return {};
  },
});
</script>
