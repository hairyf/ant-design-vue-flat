<template>
  <div class="common-fixed-footer">
    <custom-blank :height="120" />
    <div class="footer-btns" :class="{ 'u-flex': flex }">
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
      default: true,
    },
  },
  data: () => ({}),
  computed: {},
  methods: {},
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
/* 底部操作栏 */
.footer-btns {
  position: fixed;
  padding: 20rpx;
  z-index: 1000;
  bottom: 0;
  width: 100%;
  background-color: #ffffff;
}
</style>
