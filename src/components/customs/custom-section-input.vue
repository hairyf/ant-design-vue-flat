<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-01-07 14:34:50
 * @LastEditTime: 2021-01-21 17:23:15
 * @Description: 价格区间输入框
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="custom-section-input u-flex">
    <input
      :value="inputMinValue"
      @input="onFilterOutNumber('min', $event)"
      :placeholder="minPlaceholder"
    />
    <div class="line"></div>
    <input
      :value="inputMaxValue"
      @input="onFilterOutNumber('max', $event)"
      :placeholder="maxPlaceholder"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { filterOutNumber } from '@/utils';
export default Vue.extend({
  props: {
    value: Array as () => Array<number>,
    minPlaceholder: {
      type: String,
      default: '最低价',
    },
    maxPlaceholder: {
      type: String,
      default: '最高价',
    },
  },
  data: () => ({
    min: 0,
    max: 10000,
    baseMin: 0,
    baseMax: 10000,
  }),
  computed: {
    inputMinValue() {
      return this.value[0] === this.baseMin ? '' : this.value[0];
    },
    inputMaxValue() {
      return this.value[1] === this.baseMax ? '' : this.value[1];
    },
  },
  methods: {
    // 过滤并输出为数值
    onFilterOutNumber(type: string, event: { detail: { value: string } }) {
      const isMin = type === 'min';
      const isMax = type === 'max';
      let outStr = filterOutNumber(event.detail.value) as number;
      // 避免最低值超出最高值
      const isOverflowMax = typeof outStr === 'number' && outStr > this.max;
      if (isOverflowMax && isMin) outStr = this.max;
      // 避免最低值与最高值超出区间
      const isOverflowRightSection =
        typeof outStr === 'number' && outStr > this.baseMax;
      if (isOverflowRightSection) outStr = this.baseMax;
      // 避免最低值输入后在输入最高值, 最低值超出
      if (
        typeof outStr === 'number' &&
        isMax &&
        typeof this.min === 'number' &&
        this.min > this.max
      ) {
        this.min = this.max;
      }
      if (isMin) {
        this.min = outStr || this.baseMin;
      }
      if (isMax) {
        this.max = outStr || this.baseMax;
      }
      // 派送事件
      this.$emit('input', [
        this.min,
        this.max < this.min ? this.min : this.max,
      ]);
      return outStr;
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    if (typeof this.value[0] == 'number') {
      this.min = this.value[0];
      this.baseMin = this.value[0];
    }
    if (typeof this.value[1] == 'number') {
      this.max = this.value[1];
      this.baseMax = this.value[1];
    }
  },
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
.custom-section-input {
  input {
    padding: 5rpx 30rpx;
    border-radius: 30rpx;
    background: #ececec;
    flex: 1;
    text-align: center;
  }
  .line {
    width: 20rpx;
    height: 4rpx;
    margin: 0 20rpx;
    background: #ececec;
  }
}
</style>
