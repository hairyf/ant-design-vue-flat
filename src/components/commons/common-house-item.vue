<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-19 17:21:37
 * @LastEditTime: 2021-01-28 15:53:44
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="common-house-item">
    <div class="house-item">
      <div class="layer-1 u-flex">
        <div class="left-column">
          <u-image
            class="left-column"
            width="240"
            height="240"
            :src="item.image_text"
          />
        </div>
        <div class="right-column u-flex u-flex-1">
          <div class="title">{{ item.name }}</div>
          <div class="tips">
            {{ item.extra_house_type || '' }} {{ item.area }}㎡
            {{ item.extra_house_direction || '' }} {{ item.floor || '' }}
          </div>
          <div class="u-flex u-row-between" style="width: 100%">
            <div class="price">¥ {{ item.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    item: {} as () => any,
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
.house-item {
  @include not-last-child(margin-bottom, 20rpx);
  position: relative;
  border-radius: 10rpx;
  background-color: #fff;
  overflow: hidden;
}
.right-column {
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 240rpx;
  padding: 20rpx 40rpx;
  .title {
    @include text-hidden-line(2);
  }
  .tips {
    font-size: 24rpx;
    color: #acacac;
  }
  .price {
    font-size: 34rpx;
    font-weight: bold;
    color: #ff7e5f;
  }
}
.layer-2 {
  padding: 28rpx 0;
  custom-icon {
    position: absolute;
    bottom: -20rpx;
    right: 0;
  }
}
</style>
