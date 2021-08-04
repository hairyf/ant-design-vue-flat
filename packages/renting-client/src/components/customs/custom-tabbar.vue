<!--
 * @Author: liupei
 * @LastEditors: liupei
-->
<template>
  <div class="tabbar">
    <!--uview 自定义tabbar -->
    <u-tabbar
      v-model="tabbarCurrent"
      :list="tabbarList"
      :mid-button="true"
      :before-switch="beforeSwitch"
    ></u-tabbar>
    <!-- 套餐选择器 -->
    <u-popup v-model="showbuySetPop" mode="bottom" border-radius="14" closeable>
      <common-buyset v-if="showbuySetPop" @hide="hide" />
    </u-popup>
    <u-modal
      v-model="showLoginModal"
      show-cancel-button
      content="登录后查看更多信息"
      @confirm="$navigateTo('/pages/commons/login')"
    />
  </div>
</template>

<script lang="ts">
import { tabbarConfig } from '@/config';
import store from '@/store';
import { navigateTo } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  mixins: [tabbarConfig],
  props: {},
  data: () => ({
    // 购买套餐pop显隐
    showbuySetPop: false,
    // 授权登录弹框
    showLoginModal: false,
  }),
  computed: {},
  methods: {
    // 子组件内触发 支付完成时
    hide() {
      this.showbuySetPop = false;
    },
    // 点击底部tabbar
    beforeSwitch(index: number) {
      if (index === 2) {
        if (!store.getters.isAuthUserInfo) {
          this.showLoginModal = true;
          return false;
        }
        // 这里是点了中间的发布tab 如果有个人房源套餐
        if (store.state.user.info.meal_total > 0) {
          navigateTo('/pages/baseTabBars/publish');
        } else {
          this.showbuySetPop = true;
        }
      } else {
        return true;
      }
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
});
</script>

<style lang="scss">
.blank {
  width: 100%;
  text-align: center;
}
</style>
