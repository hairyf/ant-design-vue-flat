<!--
 * @Author: liupei
 * @LastEditors: Mr.wang
-->
<!--
 * @Author: liupei
 * @LastEditors: liupei
-->
<template>
  <div class="buyset">
    <!-- 套餐选择器 -->
    <div class="buy-set-wrap">
      <div class="title">剩余可使用房源：{{ remainSet }}</div>
      <scroll-view scroll-x="true" class="set-content">
        <div class="flex-wrap">
          <div
            class="item"
            v-for="(item, index) in mealList"
            :key="index"
            :style="{
              backgroundColor: selectIndex === index ? '#FF7E5F' : '#F5F5F5',
              color: selectIndex === index ? '#fff' : '#ADADAD',
            }"
            @click="selectIndex = index"
          >
            <div class="a">{{ item.title || '暂无' }}</div>
            <div class="b">￥{{ item.price || '暂无' }}</div>
            <div class="c">房源数：{{ item.num || '暂无' }}个</div>
            <div class="d">有效期：{{ item.validtext || '暂无' }}</div>
          </div>
        </div>
      </scroll-view>
      <!-- </div> -->
      <div class="buy-needknow">
        <div class="title">购买须知</div>
        <div class="readme">{{ readme || '暂无' }}</div>
      </div>
      <div class="bot">
        <div class="left">
          合计：
          <span class="needcolor"
            >￥{{ mealList[selectIndex].price || '暂无' }}</span
          >
        </div>
        <div class="right" @click="buy">立即支付</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { reqSetmealGet, reqSetmealCreateOrder } from '@/api';
import store from '@/store';
import { showToast } from '@/utils';
export default Vue.extend({
  data: () => ({
    // 套餐列表
    mealList: [] as any[],
    //购买须知
    readme: '',
    //当前选择的套餐index
    selectIndex: 0,
  }),
  computed: {
    remainSet() {
      return store.state.user.info.meal_total;
    },
  },
  methods: {
    // 获取房源套餐
    async reqSetmealGet() {
      const { data } = await reqSetmealGet();
      this.readme = data.buy_notice;
      this.mealList = data.data;
    },
    // // 支付
    async buy() {
      console.log();
      const { data: detail } = await reqSetmealCreateOrder({
        meal_id: this.mealList[this.selectIndex].id,
      });
      console.log(detail);
      if (detail.pay_status == 'paysuccess') {
        await showToast({ title: '购买成功！' });
      } else {
        await uni.requestPayment({
          timeStamp: detail.config.timestamp,
          nonceStr: detail.config.nonceStr,
          package: detail.config.package,
          paySign: detail.config.paySign,
          signType: detail.config.signType,
        });
      }
      this.$emit('hide');
      store.dispatch('refreshUserInfo');
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    this.reqSetmealGet();
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
.buy-set-wrap {
  padding-top: 100rpx;
  padding-bottom: 40rpx;
  min-height: 400rpx;
  .title {
    padding-left: 40rpx;
    font-size: 28rpx;
    color: #070707;
  }
  .set-content {
    padding-left: 40rpx;

    margin-top: 40rpx;
    box-sizing: border-box;
    width: 100%;
    .flex-wrap {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      min-width: 100%;
      .item {
        width: 300rpx;
        height: 240rpx;
        border-radius: 40rpx;
        margin-right: 20rpx;
        box-sizing: border-box;
        padding: 20rpx;
        flex-shrink: 0;
        .a {
          font-size: 28rpx;
          height: 40rpx;
          line-height: 40rpx;
        }
        .b {
          margin-top: 12rpx;
          font-size: 48rpx;
          height: 68rpx;
          line-height: 68rpx;
          font-weight: bold;
        }
        .c,
        .d {
          margin-top: 12rpx;
          font-size: 20rpx;
          height: 28rpx;
          line-height: 28rpx;
        }
      }
    }
  }
  .buy-needknow {
    padding: 0 40rpx;
    margin-top: 72rpx;
    .title {
      font-size: 28rpx;
      padding-left: 0;
      color: #070707;
    }
    .readme {
      margin-top: 40rpx;
      font-size: 24rpx;
      color: #adadad;
      line-height: 34rpx;
    }
  }
  .bot {
    padding: 0 40rpx;
    margin-top: 58rpx;
    font-size: 28rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
    .needcolor {
      color: #ff7e5f;
    }
    .right {
      width: 180rpx;
      height: 64rpx;
      line-height: 64rpx;
      text-align: center;
      font-size: 28rpx;
      color: #fff;
      border-radius: 40rpx;
      background-color: #ff7e5f;
    }
  }
}
</style>
