<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-08 15:54:52
 * @LastEditTime: 2021-04-13 16:42:12
 * @Description: 页面组合-卡劵信息
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <u-card
    class="union-integral-info"
    padding="10"
    :head-border-bottom="false"
    :show-head="false"
  >
    <u-grid class="custom-cart-body" :col="4" :border="false" slot="body">
      <u-grid-item @click="$navigateTo('/pages/users/myCoupons')">
        <div class="title">{{ money.coupon || '0' }}</div>
        <span>我的卡劵</span>
      </u-grid-item>
      <u-grid-item>
        <div class="title">{{ money.banlance || '0' }}</div>
        <span>余额</span>
      </u-grid-item>
      <u-grid-item @click="$navigateTo('/pages/users/integral')">
        <div class="title">{{ money.score || '0' }}</div>
        <span>积分</span>
      </u-grid-item>
      <u-grid-item @click="$navigateTo('/pages/users/bills')">
        <custom-icon name="detailed" size="45" />
        <span>账单明细</span>
      </u-grid-item>
    </u-grid>
  </u-card>
</template>

<script lang="ts">
import { useLifecycleInject } from '@/hooks/use-page-lifecycle';
import store from '@/store';
import { defineComponent, computed } from '@vue/composition-api';
export default defineComponent({
  setup: () => {
    useLifecycleInject({
      onShow: () => store.dispatch('getMoney'),
    });
    const money = computed(() => store.state.user.money);
    return {
      money,
    };
  },
});
</script>

<style lang="scss"></style>
