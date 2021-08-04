<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-02-02 10:40:15
 * @LastEditTime: 2021-02-05 11:07:54
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <u-popup
    :value="value"
    @close="$emit('input', false)"
    mode="bottom"
    height="600"
    :closeable="true"
  >
    <custom-blank :height="80" text="客服列表" />
    <div class="serve-slot-body">
      <button class="u-reset-button" open-type="contact">
        <u-cell-item title="联系在线客服">
          <u-icon slot="icon" size="32" name="kefu-ermai"></u-icon>
        </u-cell-item>
      </button>
      <u-cell-item
        v-for="(item, index) in houseMasters.list"
        :title="item.name"
        :value="item.phone"
        :key="index"
        @click="onMakePhoneCall(item.phone)"
      >
        <u-icon slot="icon" size="32" name="phone"></u-icon>
      </u-cell-item>
    </div>
  </u-popup>
</template>

<script lang="ts">
import store from '@/store';
import Vue from 'vue';
export default Vue.extend({
  props: {
    value: Boolean,
  },
  data: () => ({}),
  computed: {
    houseMasters: () => store.state.common.houseMasters,
  },
  methods: {
    // 拨打电话
    onMakePhoneCall(phoneNumber: string) {
      uni.makePhoneCall({ phoneNumber });
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
.serve-slot-body {
  height: 521rpx;
  overflow-y: auto;
}
</style>
