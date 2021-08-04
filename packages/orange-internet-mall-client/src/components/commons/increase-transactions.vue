<!--
 * @Author: Mr.wang
 * @Date: 2021-05-12 16:45:58
 * @LastEditTime: 2021-05-12 17:08:42
 * @Description: 
 * @LastEditors: Mr.wang
 * @autograph: 任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="increase-transactions">
    <u-popup
      v-model="show"
      mode="center"
      border-radius="10"
      :closeable="true"
      width="576"
      height="420"
    >
      <view-icon name="cl-delete1" size="76" color="red" class="tips-img" />
      <div class="tips-box">
        <div class="overtime-text">
          您有{{ orderNum }}笔待付款即将超时关闭的订单
        </div>
        <div class="overtime-time" v-if="cancelOrderType == '1'">
          订单将在 <span class="minute">{{ countDown }}分钟</span> 后自动关闭
        </div>

        <div style="margin-top: 40rpx">
          <u-button
            type="primary"
            shape="circle"
            ripple
            :custom-style="{
              background: $hexColor['--color-primary'],
            }"
            @click="
              (show = false),
                $navigateTo('/pages/shopOrders/cashier', {
                  id: orderId,
                })
            "
            ><span>立即去支付</span></u-button
          >
        </div>
      </div>
    </u-popup>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import { reqToBePaid } from '@/api';
import store from '@/store';
import { defineComponent, ref, computed } from '@vue/composition-api';
import { onUnload } from 'uni-composition-api';
let timer = 0;
export default defineComponent({
  props: {},

  setup: () => {
    // 是否显示
    const show = ref(false);
    // 待付款单数
    const orderNum = ref(0);
    // 待付款id
    const orderId = ref(0);
    // 倒计时
    const countDown = ref(0);
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    const cancelOrderType = computed(
      () => store.state.common.OrderBaseParam?.cancelOrder?.type
    );

    if (
      store.getters.isAuthUserInfo &&
      store.state.common.OrderBaseParam.trading_enhance == '1'
    ) {
      reqToBePaid().then((res: any) => {
        if (res.data.data.orderNum != 0) {
          orderNum.value = res.data.data.orderNum;
          orderId.value = res.data.data.orderId;
          show.value = true;
          // 如果后台开启自动取消未付款
          if (store.state.common.OrderBaseParam.cancelOrder.type == '1') {
            const time =
              dayjs(res.data.data.orderTime * 1000)
                .add(
                  Number(store.state.common.OrderBaseParam.cancelOrder.value),
                  'minute'
                )
                .unix() - dayjs().unix();
            const lefth = Math.floor((time * 1000) / (1000 * 60));
            countDown.value = lefth;
            timer = setInterval(() => {
              const lefth = Math.floor((time * 1000) / (1000 * 60));
              countDown.value = lefth;
            }, 60000);
          }
        }
      });
      onUnload(() => {
        clearInterval(timer);
      });
    }
    return {
      show,
      $hexColor,
      countDown,
      orderNum,
      orderId,
      cancelOrderType,
    };
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
.u-mode-center-box {
  padding: 25rpx 0;
}
.tips-box {
  text-align: center;
  margin: 0 64rpx;
}
.overtime-text {
  font-size: 28rpx;
  color: #000;
  line-height: 40rpx;
  margin: 90rpx 0 10rpx 0;
}
.tips-img {
  transform: translateY(50rpx);
  display: flex;
  justify-content: center;
}
.overtime-time {
  // margin-bottom: 40rpx;
  font-size: 24rpx;
  line-height: 34rpx;
  color: #acacac;
  .minute {
    color: red;
  }
}
</style>
