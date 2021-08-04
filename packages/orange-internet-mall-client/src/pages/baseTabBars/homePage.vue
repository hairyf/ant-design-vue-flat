<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-08 09:48:36
 * @LastEditTime: 2021-05-13 12:03:25
 * @Description: 首页
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="home-page">
    <view-controller type="homePage">
      <view-distribution />
      <common-copyright slot="sticky" />
    </view-controller>
    <increaseTransactions v-if="display" />
    <global-advertisement @advertisementClose="advertisementClose" />
  </div>
</template>

<script lang="ts">
import increaseTransactions from '@/components/commons/increase-transactions.vue';
import { useLifecycleProvide } from '@/hooks/use-page-lifecycle';
import GlobalAdvertisement from '@/components/view/GlobalAdvertisement.vue';
import { defineComponent, ref, computed } from '@vue/composition-api';
import store from '@/store';
export default defineComponent({
  setup() {
    useLifecycleProvide();
    // 是否请求交易增强
    const display = ref(false);
    // 是否开启广告页
    const advertisement = computed(() => store.state.common.advertisement);
    //  关闭广告页之后的事件
    const advertisementClose = (val: any) => {
      display.value = val;
    };
    // 没有开启就要请求交易增强的接口
    if (!advertisement.value.status) {
      display.value = true;
    }
    return {
      display,
      advertisementClose,
    };
  },
  components: {
    GlobalAdvertisement,
    increaseTransactions,
  },
});
</script>

<style lang="scss">
/* 全局样式 */

page,
.home-page {
  height: 100%;
}
</style>
