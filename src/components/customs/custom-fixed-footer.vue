<!--
 * @Author: Mr.Mao
 * @Date: 2021-02-22 16:16:23
 * @LastEditTime: 2021-04-23 11:15:57
 * @Description: 
 * @LastEditors: Mr.Mao
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-02-22 16:16:23
 * @LastEditTime: 2021-03-23 15:24:12
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="common-fixed-footer">
    <union-blank v-if="occupyBlock" :height="120" />
    <div
      class="footer-btns"
      :class="{ 'u-flex': flex }"
      :style="{ 'background-color': bgColor, position: position }"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    flex: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: '#ffffff',
    },
    position: {
      type: String,
      default: 'fixed',
    },
    occupyBlock: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({}),
  computed: {},
  methods: {},
  watch: {},
  setup: () => {},
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
/* 底部操作栏 */
.footer-btns {
  padding: 20rpx;
  z-index: 1000;
  bottom: 0;
  width: 100%;
  // #ifdef H5
  width: calc(100% - 40rpx);
  // #endif
}
</style>
