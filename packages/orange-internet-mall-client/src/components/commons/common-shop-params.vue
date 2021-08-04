<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-11 16:42:59
 * @LastEditTime: 2021-05-12 09:42:43
 * @Description: 商品参数弹窗
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <u-popup
    :value="value"
    @close="$emit('input', false)"
    mode="bottom"
    height="800"
    border-radius="15"
    negative-top="50"
    :closeable="true"
  >
    <div class="common-shop-params">
      <union-blank :height="80" text="保障" :font-size="35" />
      <u-empty v-if="!list.length" type="data" text="当前商品无保障"></u-empty>
      <div class="common-shop-params-content" @touchmove.stop>
        <div
          class="param-item u-border-bottom u-flex"
          v-for="(item, index) in list"
          :key="index"
        >
          <view-icon name="oe-hook" class="ensure-hook-icon u-m-r-12" />
          <div class="u-flex-1">
            <div class="ensure-hook-text">{{ item.name }}</div>
            <div class="ensure-hook-tips" v-if="item.description">
              {{ item.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </u-popup>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    value: Boolean,
    list: {
      type: Array as () => any[],
      required: true,
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
/* 全局容器 */
.common-shop-params {
  position: relative;
}
.common-shop-params-content {
  overflow-y: auto;
  padding: 0 40rpx;
  height: 719rpx;
}
.ensure-hook-icon {
  color: #1ad370;
  font-size: toRpx(15);
}
.ensure-hook-text {
  color: #000000;
  font-size: toRpx(12);
  white-space: nowrap;
}
.ensure-hook-tips {
  margin-top: 10rpx;
  color: #acacac;
  font-size: 20rpx;
}
.param-item {
  padding: 30rpx 0;
  align-items: flex-start;
  .tips {
    display: inline-block;
    width: 150rpx;
    margin-right: 25rpx;
  }
  .content {
    color: #9e9e9e;
  }
}
</style>
