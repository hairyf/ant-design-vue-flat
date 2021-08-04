<!--
 * @Author: Pan.Yu.Lin
 * @Date: 2021-05-07 14:20:52
 * @LastEditTime: 2021-05-13 13:59:58
 * @Description: 
 * @LastEditors: Mr.Mao
-->
<template>
  <div class="common-copyright">
    {{ copyrightInformation }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import { computed, defineComponent, ref } from '@vue/composition-api';
export default defineComponent({
  setup: () => {
    const offsetTop = ref(0);
    const copyrightInformation = computed(
      () => store.state.common.shopset.shopSet.copyright.value
    );
    const systemInfo = uni.getSystemInfoSync();
    const customTabbarHeight: number = Vue.prototype.$customTabbarHeight;
    offsetTop.value = systemInfo.screenHeight - customTabbarHeight - 120;
    offsetTop.value *= 2;
    return {
      offsetTop,
      copyrightInformation,
    };
  },
});
</script>

<style lang="scss">
.common-copyright {
  width: 100%;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 24rpx;
  text-align: center;
  letter-spacing: 2rpx;
  color: #6e7799;
}
.common-blank {
  height: 60rpx;
}
</style>
