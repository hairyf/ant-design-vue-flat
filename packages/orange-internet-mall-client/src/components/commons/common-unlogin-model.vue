<!--
 * @Author: Mr.Mao
 * @LastEditors: Zhilong
 * @Date: 2021-01-07 14:34:50
 * @LastEditTime: 2021-05-06 14:24:10
 * @Description: 左右对齐栅格列表
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="common-grid-good-list">
    <div class="good-layer u-flex">
      <div
        class="good-item"
        v-for="(item, index) in list"
        :key="index"
        @click="$navigateTo('/pages/commons/shopDetails')"
      >
        <u-image :width="332" :height="324" :src="item.main_picture" />
        <div class="title">
          {{ item.title }}
        </div>
        <div class="tips">销量：{{ item.sales_show }}</div>
        <div class="price-collection u-flex u-row-between">
          <span class="price">{{ item.price }}</span>
          <view-icon size="40" name="cl-star" />
          <view-icon size="40" name="cl-star-select" />
        </div>
      </div>
    </div>
    <u-empty v-if="!list.length" text="当前暂无热销商品" mode="list" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
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
.common-grid-good-list {
  margin: 0 34rpx;
}
.good-layer {
  justify-content: space-between;
  margin-bottom: 18rpx;
}
.good-item {
  width: 332rpx;
  background-color: #fff;
  border-radius: 10rpx;
  .title {
    @include text-hidden-line(2);
    margin: 20rpx;
    font-size: 28rpx;
    line-height: 40rpx;
  }
  .tips {
    margin: 0 20rpx;
    margin-bottom: 14rpx;
    font-size: 22rpx;
    color: #acacac;
  }
  .price-collection {
    margin: 0 20rpx;
    margin-bottom: 20rpx;
  }
  .price {
    font-weight: 600;
    font-size: 34rpx;
    color: #ff3d00;
  }
}
</style>
