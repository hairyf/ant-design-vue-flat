<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-02-23 10:37:39
 * @LastEditTime: 2021-03-22 17:15:43
 * @Description: 
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="custom-calendar">
    <div class="year-container">
      <u-icon
        class="enlarge-btns"
        @click="setCurrentMonth(currentTime.month - 1)"
        color="#ACACAC"
        name="arrow-left"
      />
      <span class="current-time">
        {{ currentTime.year }}年{{ currentTime.month }}日
      </span>
      <u-icon
        class="enlarge-btns"
        @click="setCurrentMonth(currentTime.month + 1)"
        color="#ACACAC"
        name="arrow-right"
      />
    </div>
    <div class="calendar-container">
      <div class="calendar-layer u-border-bottom u-margin-bottom-20">
        <div
          class="calendar-item"
          v-for="(item, index) in calendarStartItems"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
      <div
        class="calendar-layer"
        v-for="(item, index) in chunkCurrentDays"
        :key="index"
      >
        <div
          class="calendar-item"
          :class="{ 'is-signin': citem.signin, 'is-defect': citem.defect }"
          v-for="(citem, cindex) in item"
          :key="cindex"
        >
          {{ citem.text }}
        </div>
        <!-- 最后一列自动补全 -->
        <template v-if="index == chunkCurrentDays.length - 1">
          <div
            v-for="(citem, cindex) in 7 - item.length"
            :key="cindex"
            class="calendar-item"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { chunk } from 'lodash';
// 闰年年月数
const leapYeMhDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// 非闰年年月数
const notLeapYeMhDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 获取当前时间
const currentDate = new Date();

import Vue from 'vue';
export default Vue.extend({
  props: {},
  data: () => ({
    // 日历首行项
    calendarStartItems: ['日', '一', '二', '三', '四', '五', '六'],
    // 当前时间对象（年月）
    currentTime: {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
    },
    // 当前月份天数列表
    currentDays: [] as {
      text: '';
      // 已签到
      signin: boolean;
      // 签到缺失
      defect: boolean;
    }[],
  }),
  computed: {
    // 分割为二维数组, 长度为 7
    chunkCurrentDays(): any[][] {
      return chunk(this.currentDays, 7);
    },
  },
  methods: {
    // 获取某年某月第一天是星期几
    getWeekDay(month: number, year: number) {
      const tmpDate = new Date(year, month, 1);
      return tmpDate.getDay();
    },
    // 获取某月总天数
    getMonthDay(month: number, year: number) {
      return year % 4 ? notLeapYeMhDays[month] : leapYeMhDays[month];
    },
    // 生成递进的数组 2~13 1~20
    generateArray(start: number, end: number) {
      end = end > start ? end : start;
      return [...Array(end + 1).keys()].slice(start);
    },
    // 初始化月份天数显示
    refreshDate() {
      // 获取该月总天数
      const totalDay = this.getMonthDay(
        this.currentTime.month,
        this.currentTime.year
      );
      // 获取该月第一天是星期几
      const firstDay = this.getWeekDay(
        this.currentTime.month,
        this.currentTime.year
      );
      this.currentDays = [
        ...new Array(firstDay).fill(''),
        ...this.generateArray(1, totalDay),
      ].map((item) => {
        return {
          text: item,
          signin: false,
          defect: false,
        };
      });
      // 模拟签到情况
      this.currentDays[6].defect = true;
      this.currentDays[7].signin = true;
      this.currentDays[8].signin = true;
      this.currentDays[9].signin = true;
      this.currentDays[10].signin = true;
    },
    // 设置显示月份
    setCurrentMonth(month: number) {
      if (month < 0) {
        this.currentTime.year - 1;
        this.currentTime.month = 11;
      } else if (month > 12) {
        this.currentTime.year + 1;
        this.currentTime.month = 0;
      } else {
        this.currentTime.month = month;
      }
      currentDate.setFullYear(this.currentTime.year, this.currentTime.month);
      this.currentTime = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
      };
      this.refreshDate();
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    this.refreshDate();
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
.year-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32rpx 0;
  .current-time {
    width: 150rpx;
    padding: 0 55rpx;
    text-align: center;
  }
}
.calendar-container {
  padding: 0 25rpx;
  .calendar-layer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .calendar-item {
    width: 60rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 50%;
    text-align: center;
    &.is-signin {
      background-color: #fe9b2a;
      color: #ffffff;
    }
    &.is-defect {
      background-color: #d9d9d9 !important;
      color: #ffffff !important;
    }
  }
}
</style>
