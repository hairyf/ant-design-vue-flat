<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.Mao
 * @Date: 2021-02-22 10:07:10
 * @LastEditTime: 2021-05-10 11:53:35
 * @Description: 账单明细
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="bills">
    <u-dropdown :active-color="$hexColor['--color-primary']">
      <u-dropdown-item
        @change="resetList"
        v-model="currentMode"
        title="支付方式"
        :options="modes"
      />
      <u-dropdown-item
        @change="resetList"
        v-model="currentClass"
        title="分类"
        :options="classs"
      />
    </u-dropdown>
    <div class="bill-list">
      <div class="bill-item" v-for="(item, index) in list" :key="index">
        <div class="left-column">
          <div class="tips">{{ item.remark }}</div>
          <div
            class="right-column price"
            :class="{ 'add-price': item.balance_change < 0 }"
          >
            {{ item.balance_change >= 0 ? '+' : '' }}
            {{ item.balance_change }}元
          </div>
        </div>
        <div class="times">
          {{ $formatUnix(item.add_time) }}
        </div>
      </div>
    </div>
    <u-empty
      v-if="!list.length"
      :margin-top="150"
      text="暂无账单"
      mode="list"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { reqgetBanlanceLog } from '@/api';
import { useListPaging } from '@/hooks/use-list-paging';
import store from '@/store';
export default defineComponent({
  setup: () => {
    // 调用分页逻辑
    const currentMode = ref('all');
    const currentClass = ref(0);
    const { list, resetList } = useListPaging({
      getList: async (page) => {
        const { data } = await reqgetBanlanceLog({
          page,
          limit: 10,
          type: currentClass.value,
          pay_code: currentMode.value,
        });
        return data.data.data;
      },
    });
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );
    return { list, resetList, currentMode, currentClass, $hexColor };
  },
  components: {},
  data: () => ({
    classs: [
      { label: '全部', value: 0 },
      { label: '下单 ', value: 1 },
      { label: '充值', value: 2 },
      { label: '退款', value: 3 },
    ],
    modes: [
      { label: '全部', value: 'all' },
      { label: '余额支付', value: 'Balance' },
      { label: '微信支付', value: 'WxPay' },
      { label: '支付宝支付', value: 'AliPay' },
    ],
  }),
  computed: {},
  methods: {
    // async getBanlance() {
    //   const { data } = await reqgetBanlanceLog({
    //     type: this.currentClass,
    //     pay_code: this.currentMode,
    //   });
    //   this.list = data.data.data;
    // },
  },

  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    // this.getBanlance();
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
});
</script>

<style lang="scss">
.bills {
  position: relative;
  padding-bottom: 30px;
}
.u-dropdown {
  padding-left: 25rpx;
}
.u-dropdown__menu__item {
  flex: 0 1 auto !important;
  width: 180rpx !important;
  .u-dropdown__menu__item__text {
    margin-right: 25rpx;
  }
}
.bill-list {
  padding: 0 32rpx;
}
.bill-item {
  padding: 40rpx 0;
  border-bottom: 2rpx solid #ebebeb;
  .left-column {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .tips {
    width: 500rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-bottom: 10rpx;
  }
  .right-column {
    font-size: 28rpx;
    font-weight: bold;
    color: #000000;
  }
  .times {
    color: #acacac;
    font-size: 20rpx;
  }
  .add-price {
    color: orange;
  }
}
</style>
