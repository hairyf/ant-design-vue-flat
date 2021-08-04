<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-07 14:34:50
 * @LastEditTime: 2021-01-25 09:28:30
 * @Description: 页面组合-空白模板
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="blank" :style="[style]">
    {{ text }}
  </div>
</template>

<script lang="ts">
import { analyUnit } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  props: {
    // 空白模板高度
    height: {
      type: [String, Number],
      default: 15,
    },
    // 空白模板颜色
    bgColor: String,
    // 定位方式
    position: {
      type: String,
      default: 'static',
    },
    // 内容区字体
    text: {
      type: String,
      default: '',
    },
    // 字体尺寸
    fontSize: {
      type: [String, Number],
      default: 30,
    },
    // 字体颜色
    color: {
      type: String,
      default: '#000',
    },
  },
  data: () => ({}),
  computed: {
    style(): any {
      return {
        height: analyUnit(this.height),
        lineHeight: analyUnit(this.height),
        fontSize: analyUnit(this.fontSize),
        color: this.color,
        backgroundColor: this.bgColor,
        position: this.position,
      };
    },
  },
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
.blank {
  width: 100%;
  text-align: center;
}
</style>
