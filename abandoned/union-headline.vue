<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-08 16:01:46
 * @LastEditTime: 2021-03-23 14:42:54
 * @Description: 页面组合-今日头条
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="union-headline">
    <u-card :show-head="false" :border="false" :padding="15" margin="25rpx">
      <div class="u-card-headline__body u-flex" slot="body">
        <image
          class="headline-icon"
          src="https://client-static-1254212114.cos.ap-guangzhou.myqcloud.com/images/headlines.png"
        />
        <div class="headline__content u-flex">
          <div class="headline__item u-flex">
            <u-tag size="mini" text="最新" mode="dark" />
            <span class="tips u-flex-1">新年有你陪伴皆是团圆</span>
          </div>
          <div class="headline__item u-flex">
            <u-tag size="mini" text="最新" mode="dark" />
            <span class="tips u-flex-1">商城后续更新计划和日常优化</span>
          </div>
        </div>
      </div>
    </u-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {},
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
/* 头条 */
.u-card-headline__body {
  height: 95rpx;
  .headline__content {
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-left: 15rpx;
  }
  .headline__item {
    .tips {
      margin-left: 15rpx;
    }
  }
  .headline-icon {
    width: 68rpx;
    height: 90rpx;
  }
}
</style>
