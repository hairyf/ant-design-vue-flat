<!--
 * @Author: Mr.Mao
 * @LastEditors: Zhilong
 * @Date: 2021-01-08 09:48:36
 * @LastEditTime: 2021-05-18 16:32:47
 * @Description: 个人
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <view-controller type="personal">
    <view-distribution />
    <common-copyright slot="sticky" />
    <view-shops-recommend type="会员中心" />
  </view-controller>
</template>

<script lang="ts">
import { useLifecycleProvide } from '@/hooks/use-page-lifecycle';
import store from '@/store';
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
  setup() {
    useLifecycleProvide();
    store.getters.isAuthUserInfo && store.dispatch('getUserInfo');
    if (store.getters.isAuthUserInfo) {
      store.dispatch('getMoney');
    }
    const common = store.state.common;
    return { common };
  },
});
</script>

<style lang="scss">
/* 全局样式 */
page {
  height: 100%;
}
</style>
