<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-15 10:47:09
 * @LastEditTime: 2021-01-22 14:19:44
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <image @click="$emit('click')" :src="path" :style="[style]" />
</template>

<script lang="ts">
import { analyUnit } from '@/utils';
import Vue from 'vue';
export default Vue.extend({
  props: {
    name: String,
    size: {
      type: [Number, String],
      default: 48,
    },
  },
  data: () => ({}),
  computed: {
    path(): string {
      return `/static/icons/${this.name}.png`;
    },
    style(): any {
      return {
        width: analyUnit(this.size),
        height: analyUnit(this.size),
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

<style lang="scss"></style>
