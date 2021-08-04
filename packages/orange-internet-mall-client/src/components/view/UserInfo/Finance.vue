<!--
 * @Author: Mr.Mao
 * @Date: 2021-04-20 15:18:36
 * @LastEditTime: 2021-05-08 14:21:10
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div
    class="finance u-flex"
    :class="[option.componentStyle.styleType]"
    :style="{ color: option.colorStyle.color.financeText }"
  >
    <div
      class="u-flex-1"
      v-if="option.contentEdit.contents.some((v) => v === '积分')"
      @click="$navigateTo('/pages/users/integral')"
    >
      <div class="u-flex u-row-center">
        <view-image
          v-if="option.componentStyle.styleType === 'one'"
          class="u-m-r-5"
          :size="30"
          :src="option.contentEdit.integralIcon"
        />
        <div class="u-flex u-flex-col">
          <span class="u-m-b-4">
            {{ cornerMarker.score || 0 }}
          </span>
          <span>积分</span>
        </div>
      </div>
    </div>
    <div
      class="u-flex-1"
      @click="$navigateTo('/pages/users/wallet')"
      v-if="option.contentEdit.contents.some((v) => v === '余额')"
    >
      <div class="u-flex u-row-center">
        <view-image
          v-if="option.componentStyle.styleType === 'one'"
          class="u-m-r-5"
          :size="30"
          :src="option.contentEdit.balanceIcon"
        />
        <div class="u-flex u-flex-col">
          <span class="u-m-b-4">
            {{ cornerMarker.banlance || 0 }}
          </span>
          <span>{{ balance_txt }}</span>
        </div>
      </div>
    </div>
    <div
      class="u-flex-1"
      @click="$navigateTo('/pages/users/myCoupons', { myFlag: 0 })"
      v-if="option.contentEdit.contents.some((v) => v === '优惠券')"
    >
      <div class="u-flex u-row-center">
        <view-image
          v-if="option.componentStyle.styleType === 'one'"
          class="u-m-r-5"
          :size="30"
          :src="option.contentEdit.couponIcon"
        />
        <div class="u-flex u-flex-col">
          <span class="u-m-b-4">
            {{ cornerMarker.coupon || 0 }}
          </span>
          <span>优惠券</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { userInfoOption } from 'orange-components-config/options';
import { computed, defineComponent } from '@vue/composition-api';
import store from '@/store';
export default defineComponent({
  props: {
    option: {
      type: Object as () => typeof userInfoOption,
      required: true,
    },
  },
  setup: () => {
    const userInfo = computed(() => store.state.user.info);
    const balance_txt = computed(
      () => store.state.common.depositWithdrawal.deposit.balance_txt
    );
    const cornerMarker = computed(() => store.state.user.money);
    return { userInfo, cornerMarker, balance_txt };
  },
});
</script>
<style lang="scss" scoped>
.finance {
  position: relative;
  font-size: toRpx(12);
  padding-bottom: toRpx(15);
  &.one {
    padding: toRpx(12);
    margin: 0 toRpx(40);
    margin-top: toRpx(-30);
    background-color: #fff;
    box-shadow: toRpx(0) toRpx(2) toRpx(4) rgba(0, 0, 0, 0.05);
    border-radius: toRpx(15);
  }
}
</style>
