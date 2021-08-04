<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-08 15:59:42
 * @LastEditTime: 2021-02-20 16:09:58
 * @Description: 页面组合-按钮组
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="union-grid">
    <u-grid :col="4" :border="false">
      <u-grid-item>
        <custom-icon name="signIn" size="80" />
        <span>签到</span>
      </u-grid-item>
      <!-- <u-grid-item>
        <custom-icon name="activity" size="80" />
        <span>活动</span>
      </u-grid-item> -->
      <u-grid-item>
        <custom-icon name="footprint" size="80" />
        <span>足迹</span>
      </u-grid-item>
      <u-grid-item>
        <custom-icon name="order" size="80" />
        <span>订单</span>
      </u-grid-item>
      <u-grid-item>
        <custom-icon name="member" size="80" />
        <span>会员中心</span>
      </u-grid-item>
    </u-grid>
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
u-grid {
  u-grid-item {
    image {
      width: 80rpx;
      height: 80rpx;
    }
  }
}
</style>
