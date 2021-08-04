<!--
 * @Author: Mr.Mao
 * @LastEditors: Mr.wang
 * @Date: 2021-01-13 14:12:56
 * @LastEditTime: 2021-05-20 10:02:06
 * @Description: 红包卡劵
 * @任何一个傻子都能写出让电脑能懂的代码，而只有好的程序员可以写出让人能看懂的代码
-->
<template>
  <div class="coupons">
    <view-controller>
      <u-tabs
        :list="tabs"
        :is-scroll="false"
        :current="currentTab"
        bg-color="#f8f8f8"
        :active-color="$hexColor['--color-primary']"
        inactive-color="#ACACAC"
        font-size="34"
        @change="tabEvent"
      ></u-tabs>
      <div v-for="(item, index) in list" :key="index">
        <!-- 满减卷和折扣卷 -->
        <u-card
          :show-head="false"
          :border="false"
          :padding="0"
          v-if="item.status == 1 && isUseLimit(item)"
        >
          <div
            :class="[
              'custom-discount__body',
              'u-flex',
              item.type == 1 ? 'full' : 'disc',
            ]"
            slot="body"
          >
            <div class="left-column u-flex">
              <!-- 满减类型 -->
              <div class="count-layer" v-if="item.type == 1">
                <span class="tips">¥</span>
                <span class="content">{{ item.money - 0 }}</span>
              </div>
              <!-- 折扣类型 -->
              <div v-if="item.type == 2" class="count-layer">
                <span class="content">{{ item.money - 0 }}</span>
                <span class="tips">折</span>
              </div>
              <!-- 优惠卷使用条件 -->
              <div class="tips-layer">
                满{{ item.condition_order_amount - 0 }}元可使用
              </div>
            </div>
            <div class="right-column u-flex u-flex-1 u-row-center">
              <div class="title">{{ item.name }}</div>
              <div class="tips-btns u-flex u-row-between">
                <span class="tips over-text">{{ item.explain }}</span>
                <span class="btns" @click.stop="onSelectItem(item)"
                  >立即领取</span
                >
                <!-- <span class="btns" @click="onSelectItem">已领取</span> -->
              </div>
              <div class="times">
                有效期：{{ $formatUnix(item.start_time, 'YYYY-MM-DD') }}至{{
                  $formatUnix(item.end_time, 'YYYY-MM-DD')
                }}
              </div>
            </div>
          </div>
        </u-card>
      </div>
    </view-controller>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { useListPaging } from '@/hooks/use-list-paging';
import { reqAllCouponList, reqGetCoupon } from '@/api';
import { showToast } from '@/utils';
import store from '@/store';
export default defineComponent({
  components: {},
  data: () => ({
    tabs: [
      { id: 1, name: '满减卷' },
      { id: 2, name: '折扣卷' },
    ],

    currentTab: 0,
  }),
  computed: {},
  methods: {
    // 选择优惠卷项
    async onSelectItem(item: any) {
      await reqGetCoupon(item.id);

      if (item.get_max_one_person == -1)
        return await showToast({
          icon: 'none',
          title: '还可以领取无限张',
        });
      await showToast({
        icon: 'none',
        title: `还可以领取${
          item.get_max_one_person - ++item.user_coupon_count
        }张`,
      });
    },
    // 切换优惠卷类型
    tabEvent(index: number) {
      this.currentTab = index;
      this.couponType = index + 1;
      this.AllCouponLis();
    },
    // 请求数据
    async AllCouponLis() {
      // 分从哪个页面跳转的

      const { data } = await reqAllCouponList({
        page: 1,
        limit: 10,
        search: { type: this.couponType + '' },
      });

      this.list = data.data.data;
    },
    isUseLimit(item: any) {
      // return (
      //   Number(new Date().getTime() / 1000) >= item.use_start_time &&
      //   Number(new Date().getTime() / 1000) <= item.use_end_time
      // );
      return true;
    },
  },
  watch: {},
  setup() {
    const $hexColor = computed(
      (): CssLightVariableType => store.getters.hexColor
    );

    // 选择优惠卷类型
    const couponType = ref(1);
    // 调用分页逻辑
    const { list, resetList } = useListPaging({
      getList: async (page) => {
        const { data } = await reqAllCouponList({
          page,
          limit: 10,
          search: { type: couponType.value + '' },
        });
        return data.data.data;
      },
    });
    return { $hexColor, list, couponType, resetList };
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

<style lang="scss" scoped>
@include full-page('coupons', #f8f8f8);
::v-deep .shade {
  width: 100%;
  height: 100%;
  color: #ffffff;
  background: #000;
  opacity: 0.2;
  /*相对父元素外壳定位*/
  position: absolute;
  left: 0px;
  top: 0px;
  /*解决hover后图片闪动问题*/
  pointer-events: none;
  /*防止设置padding后影响盒子大小*/
  box-sizing: border-box;
  float: left;
  /*遮罩置于顶层*/
  z-index: 999;
}
.over-text {
  width: 330rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
